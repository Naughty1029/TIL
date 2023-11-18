## やりたいこと
- most popular postsを利用してPV順に記事を表示する
- 記事を「もっと見るボタン」が押下されたら、非同期処理で1件ずつ取得
- 取得した記事は表示済み記事の下、追加して表示
- 最初の状態では人気記事は1件のみ表示
- 表示する記事がこれ以上ない場合は「もっと見るボタン」を非表示
- 非同期処理で記事取得中は「もっと見るボタン」を非活性化

## 関連記事
[投稿記事の非同期取得](./投稿記事の非同期取得.md)

## フォルダ構成
```
theme/
  ├ css/
    └ top.css
  ├ js/
    └ loadmore.js
  ├ functions.php
  ├ index.php
  └ style.css
```

## コード概要

### index.php
```php
<!DOCTYPE html>
<html lang="en">
<?php wp_head(); ?>
<body>
<?php
if (class_exists('\WordPressPopularPosts\Query')):
  $wpp_args = array(
    'range' => 'monthly',//集計する期間 {daily(1日), weekly(1週間), monthly(1ヶ月), all(全期間)}
    'order_by' => 'views',//表示順｛views（閲覧数),comments（コメント数）,avg（1日の平均）}
    'post_type' => 'post',//複数の場合は'post, name1, nem2'
    'limit' => 1, //表示数
  );
  $wpp_query = new \WordPressPopularPosts\Query( $wpp_args );
  // // ループ開始
  $wpp_posts = $wpp_query->get_posts();
  if ($wpp_posts):
    foreach ($wpp_posts as $wpp_post):
      $post = get_post($wpp_post->id);
      setup_postdata($post);
      $post_date = get_the_date();
      $modified_date = get_the_modified_date();
      // 投稿の表示内容
      if ($post_date != $modified_date) {
        // 最終更新日を表示
        echo "<div>".get_the_title()."</div>";
        echo '最終更新日: ' . $modified_date;
      } else {
          // 投稿日を表示
          echo "<div>".get_the_title()."</div>";
          echo '投稿日: ' . $post_date . "<br>";
      }
    endforeach;
  endif;
  wp_reset_postdata();
  endif;
?>

<button id="loadmore">もっと見る</button>
</body>
</html>
```

### functions.php
```php
<?php

function my_theme_scripts() {
  wp_enqueue_style('my_css', get_template_directory_uri() . '/css/top.css');
  wp_enqueue_script('my_loadmore', get_template_directory_uri() . '/js/loadmore.js', array('jquery'));
  // ローカル変数をJavaScriptに渡す
  wp_localize_script('my_loadmore', 'my_ajax_object', array(
    'ajax_url' => admin_url('admin-ajax.php'),
));
}

add_action('wp_enqueue_scripts', 'my_theme_scripts');



function loadmore_ajax_handler() {
  // AJAXリクエストからoffsetを取得
  $offset = isset($_POST['offset']) ? intval($_POST['offset']) : 0;

  // WordPress Popular Postsのクエリパラメータ
  $wpp_args = array(
      'range' => 'monthly',
      'order_by' => 'views',
      'post_type' => 'post',
      'limit' => 1, // 一度に表示する投稿数
      'offset' => $offset
  );

  // WPPクエリの作成
  $wpp_query = new \WordPressPopularPosts\Query($wpp_args);
  $wpp_posts = $wpp_query->get_posts();
  $content = '';
  // 投稿の表示
  if (!empty($wpp_posts)) {
      foreach ($wpp_posts as $wpp_post) {
          $post = get_post($wpp_post->id);
          setup_postdata($post);
          $post_date = get_the_date('',$post->ID);
          $modified_date = get_the_modified_date('',$post->ID);

          // 投稿の表示内容
          if ($post_date != $modified_date) {
              // 最終更新日を表示
              $content .= "<div>".get_the_title($post->ID)."</div>";
              $content .= '最終更新日: ' . $modified_date . "<br>";
          } else {
              // 投稿日を表示
              $content .= "<div>".get_the_title($post->ID)."</div>";
              $content .= '投稿日: ' . $post_date . "<br>";
          }
      }
  }

  wp_reset_postdata();
    // 次があるか？
  $wpp_args = array(
    'range' => 'monthly',
    'order_by' => 'views',
    'post_type' => 'post',
    'limit' => 1, // 一度に表示する投稿数
    'offset' => $offset + 1
  );

  // WPPクエリの作成
  $wpp_query = new \WordPressPopularPosts\Query($wpp_args);
  $next_posts = $wpp_query->get_posts();
  if(empty($next_posts)){
    echo json_encode([
      'content' => $content,
      'remaining' => false
    ]);
  }else{
    echo json_encode([
      'content' => $content,
      'remaining' => true
    ]);
  }
  wp_reset_postdata();
  die();
}
add_action('wp_ajax_loadmore', 'loadmore_ajax_handler');
add_action('wp_ajax_nopriv_loadmore', 'loadmore_ajax_handler');
```

### js/loadmore.js
```javascript
jQuery(function($){
  let offset = 1;
  $('#loadmore').on('click', function() {
    $(this).addClass("loading");
    const $that = $(this);
    $.ajax({
        url : my_ajax_object.ajax_url,
        data : {
            'action': 'loadmore',
            'offset' : offset
        },
        type : 'POST',
        success : function( response ){
            const data = JSON.parse(response);
            if(data) {
                $that.before(data.content); // 投稿を挿入
                offset++;
                if (!data.remaining) {
                    $that.hide(); // ボタンを隠す
                }
                $that.removeClass("loading");
            }
        }
    });
    return false;
  });
});
```

### css/top.css
```css
.loading {
  pointer-events:none;
  opacity: 0.5;
}
```

## 参考記事
- https://stackoverflow.com/questions/58764925/create-loadmore-for-wordpress-with-ajax-and-custom-post-type
- https://y-hilite.com/1648/
- https://teratail.com/questions/245536

## 追記
このままだと「もっと見るボタン」をクリックしてから初めて非表示になるので要修正