大規模サイトを作る際には、まずテンプレートHTMLを作成します。テンプレートがあると、ヘルプの人に指示を出す時が楽だからです。またテンプレートで枠組みを決めておけば、制作スピードも上がります。

今回紹介するのは、自分の書き方になります。なので、これが最善というわけではありません。自分が使い慣れてるだけです。

```html
<!DOCTYPE html>
<html lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
	<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <meta name="apple-mobile-web-app-capable" content="yes">

    <!-- favicon -->
    <link rel="icon" href="/assets/favicon.ico">
    <link rel="apple-touch-icon" href="apple-touch-icon-152x152.png" sizes="152x152">
    <link rel="icon" href="android-chrome-192x192.png" sizes="192x192" type="image/png">

	<title></title>
	<meta name="description" content="">
    
    <!-- OGP -->
	<meta property="og:title" content="" />
    <meta property="og:description" content="" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="" />
    <meta property="og:site_name" content="" />
    <meta property="og:locale" content="ja_JP" />
    <meta name="twitter:card" content="summary_large_image" />

	<link rel="stylesheet" href="/assets/css/common.css">
</head>

<body>
	<div class="large-frame">
		<header>
            <!-- ヘッダー　-->
        </header>
		<main>
			<div class="l-container">
				<div class="l-container-header">
					<!-- ページのタイトルがよく入る　-->
				</div>
				<div class="l-container-body">
					<!-- ページの内容　-->
				</div>
				<div class="l-container-footer">
					<!-- 多いのはパンクず　-->
				</div>
			</div>
		</main>
		<footer>
              <!-- フッター　-->
        </footer>
	</div>
</body>
</html>
```

このテンプレートをよく自分は使います。使うコツとしては**l-container関連にはCSSを当てないことです。**

```css
.l-container-header {
    padding-top: 30px;
    padding-bottom: 30px;
}
```
とスタイルを書いてしまうと、それ以外の数値で使いづらくなります。**上のHTMLは枠組みを明確にするためだけに使っています。**

```html
<div class="l-container-header">
    <h2 class="common-heading">ページタイトル</div>
</div>
```
このように書いたら、CSSは
```css
.common-heading {
    font-size:32px;
    text-align: center;
    padding-top: 30px;
    padding-bottom: 30px;
}
```
l-container-header内部の要素にCSSを当てます。ページ固有のCSSを書く際には、
```html
<div class="l-container page-about">
~
</div>
``` 
l-containerにクラスを付けて、page-aboutを先頭にしてCSSを書きます。

```css
.page-about .title {
    font-size: 36px;
}
```

大規模になるとページの数は５０ページ以上とかになります。共通化して上手くCSSを書くのも大事ですが、**他のページに影響が出ないようにカプセル化してCSSを書くことも重要です。**