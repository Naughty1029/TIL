##  データベースに接続
まずは何も考えずに下記をPHPファイルに貼る。
 ```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'oruca');
define('DB_USER', 'oruca');
define('DB_PASSWORD', 'oruca');

// 文字化け対策
$options = array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET CHARACTER SET 'utf8'");

// PHPのエラーを表示するように設定
error_reporting(E_ALL & ~E_NOTICE);
 
try {
    //データベース接続
   $pdo = new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME, DB_USER, DB_PASSWORD, $options);
   $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   
} catch(PDOException $e) {

  // (2) エラーメッセージを出力
  echo $e->getMessage();

} finally {

  // (3) データベースの接続解除
  $pdo = null;
}
```

## PDO
PDOを使ってデータベースにアクセスする際の手順は以下になります。

1. データベースに接続する。
2. 実行したいSQL文をセットする。
3. SQLに対してパラメーターをセットする。【任意】
4. 実際にSQLを実行する。
5. 結果を取得する。【任意】
6. データーベースから切断する。

実行したいSQL文をセットする方法は大きわけて2つあります。それが`query`と`prepare`になります。


## query

`query`は2,3,4を一気に実行します。図で表すと

①を実行
↓
queryを実行（②③④が一気に実行される）
↓
⑤を実行
↓
⑥を実行
 
 ```php
 $pdo->query('SELECT * FROM m_member');
 ```

## prepare
`prepare`は順番に従います。

①を実行
↓
②prepareを実行
↓
③bindValueを実行
↓
④executeを実行
↓
⑤を実行
↓
⑥を実行

```php
$pdo->prepare('SELECT * FROM m_member');
```

## queryとprepareの違い

SQL文の中に変動値が入る場合、以下のようにPHPの変数を直接連結してしまうと**「SQLインジェクション攻撃」**により悪意のあるSQLが実行されてしまう可能性がある。($nameの部分）

```sql
$sql = "SELECT * FROM user WHERE name='$name'";
```

そのため、**「プレースホルダ」**という仕組みを使って、以下のように変動値を安全にSQL文に割り当てる。２個目のsql文のプレースホルダは**「名前付きプレースホルダ」**と呼ばれる

```sql
$sql = "SELECT * FROM user WHERE name = ?";
$sql = "SELECT * FROM user WHERE name=:name";
```

queryでは、このプレースホルダを扱うことができません。そのため、プレースホルダがある場合はprepareを使います。
ただqueryは使いません。SQLインジェクションの可能性もあるため、基本的にprepareを使いましょう。


## bindValue
bindValue関数は、**プリペアドステートメントで使用するSQL文の中で、変数の値(プレースホルダ)をバインドするための関数**です。

プリペアドステートメントとは、SQL文に対して、一部分的を変更の可能な場所として定義し、さらに定義したものを自由に変更できるようにするためのデータベース機能です。

bindValueのコードは下記の使い方になります。

```
bindValue ($パラメータID, $バインドする値 [, $PDOデータ型定数] )
```

まずは下記のコードを実行してみましょう。

```php
try {
	//データベース接続
	$pdo = new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME, DB_USER, DB_PASSWORD, $options);
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	$sql = "SELECT * FROM m_member WHERE last_name = ?";//プレースホルダありのSQL文

	$sth = $pdo->prepare($sql);//prepare関数にセットする

	$sth->bindValue(1, "野村");//ここで値を挿入する

	$sth->execute();//SQL文実行する。

	$data = $sth->fetch(PDO::FETCH_NAMED);//fetchを使ってデータを取得する

	echo '<pre>';
	var_dump($data);
	echo '</pre>';


} catch(PDOException $e) {

	// (2) エラーメッセージを出力
	echo $e->getMessage();

} finally {

	// (3) データベースの接続解除
	$pdo = null;
}
```
SQL文にプレースホルダが含まれています。
```php
$sql = "SELECT * FROM m_member WHERE last_name = ?";
```
このプレースホルダーの値を確定してるのが下記です。
```php
$sth->bindValue(1, "野村");
```
$パラメータIDが`1`のプレースホルダに`野村`という値を挿入しています。ではプレースホルダが複数ある場合は？

```php
$sql = "SELECT * FROM m_member WHERE last_name = ? and first_name = ?";
```
このように２個プレースホルダがある場合は、`last_name`が`1`、`first_name`が`2`になります。
```php
$sth->bindValue(1, "野村");
$sth->bindValue(2, "雄平");
```

### 名前付きプレースホルダー

```php
try {
	//データベース接続
	$pdo = new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME, DB_USER, DB_PASSWORD, $options);
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	$sql = "SELECT * FROM m_member WHERE last_name = :name";//プレースホルダありのSQL文

	$sth = $pdo->prepare($sql);//prepare関数にセットする

	$sth->bindValue(":name", "野村");//ここで値を挿入する

	$sth->execute();//SQL文実行する。

	$data = $sth->fetch(PDO::FETCH_NAMED);//fetchを使ってデータを取得する

	echo '<pre>';
	var_dump($data);
	echo '</pre>';


} catch(PDOException $e) {

	// (2) エラーメッセージを出力
	echo $e->getMessage();

} finally {

	// (3) データベースの接続解除
	$pdo = null;
}
```

名前付きプレースホルダーを使う際は、数字ではなく名前を指定します。
```php
$sth->bindValue(":name", "野村");//ここで値を挿入する
```
## SQLを実行する

`prepare`関数にSQL文をセットして、`bindValue`関数で値を固定してもデータベースからデータを得ることはできません。最後に`execute`関数を実行する必要があります。

```php
$sql = "SELECT * FROM m_member WHERE last_name = :name";//プレースホルダありのSQL文

$sth = $pdo->prepare($sql);//prepare関数にセットする

$sth->bindValue(":name", "野村");//ここで値を挿入する

$sth->execute();//SQL文実行する。
```
これでSQL文が実行されます。余談ですが、インターネットで検索すると、下記のようにexecuteをした結果を変数に入れてるコードがあります。

```php
$res = $sth->execute();
```
このコードを見ると、SQL実行の値が`$res`に格納されてるように見えますが、格納されてるのはBool型で`true`か`false`になります。
これは、SQL実行が成功したかどうかの判定が格納されています。（初心者だと、値が格納されてるとか勘違いする）

## データを取得する
SQL文の実行が終わったので、データベースから得たデータを表示します。その時に使うのが`fetch`と`fetcAll`になります。
`fetch`は複数データがあっても最初のデータだけを取得します。`fetchAll`は全て取得します。

### PDO::定数

```php
$sql = "SELECT * FROM m_member WHERE last_name = :name";//プレースホルダありのSQL文

$sth = $pdo->prepare($sql);//prepare関数にセットする

$sth->bindValue(":name", "野村");//ここで値を挿入する

$sth->execute();//SQL文実行する。

$data = $sth->fetch(PDO::FETCH_ASSOC);//fetchを使ってデータを取得する
```
このコードの最後でfetchを使って、`$data`にSQL文実行結果を格納しています。`fetch`関数にPDO::定数というものが指定されています。
この定数を指定しないと、データが重複して入って来たりします。下記にまとめた記事を貼っておきます。（よくわかってない）
https://kinocolog.com/pdo_fetch_pattern/





## テーブルを取得
defineとかは省略
```php
try {
    //データベース接続
   $pdo = new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME, DB_USER, DB_PASSWORD, $options);
   $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
   $sql = 'SELECT * FROM m_member'
   $sth = $pdo->prepare($sql);

   // (3) SQL実行
    $sth->execute();

	$data = $sth->fetchAll(PDO::FETCH_ASSOC);
    echo '<pre>';
    var_dump($data);
    echo '</pre>';
   
} catch(PDOException $e) {

  // (2) エラーメッセージを出力
  echo $e->getMessage();

} finally {

    $dbh = null;
}
```

## 条件を指定して取得
社員テーブルのチームIDが「3」（エンジニアチーム）のレコードだけ抽出してみる。
```php
try {
    //データベース接続
   $pdo = new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME, DB_USER, DB_PASSWORD, $options);
   $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
   $sql = "SELECT team_id, number, last_name, first_name, sort FROM m_member WHERE team_id = 3;";
   $sth = $pdo->prepare($sql);

    // (3) SQL実行
    $sth->execute();

    $data = $sth->fetchAll(PDO::FETCH_ASSOC);
    echo '<pre>';
    var_dump($data);
    echo '</pre>';
   
} catch(PDOException $e) {

  // (2) エラーメッセージを出力
  echo $e->getMessage();

} finally {

    $dbh = null;
}
```

## テーブルを合体させて欲しい情報を取得する
社員テーブルに、チームテーブル・コンディションテーブル・ステータステーブル・勤務時間テーブルを内部結合してみる。
```php
try {
    //データベース接続
   $pdo = new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME, DB_USER, DB_PASSWORD, $options);
   $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
   $sql = "SELECT
          m_member.number,
          m_member.last_name,
          m_member.first_name,
          m_member.sort,
          m_team.team_name,
          m_status.status,
          m_worktime.worktime,
          t_condition.comment
        FROM
          m_member
        INNER JOIN
          m_team
        ON
          m_member.team_id = m_team.team_id
        LEFT OUTER JOIN
          t_condition
        ON
          m_member.member_id = t_condition.member_id
        LEFT OUTER JOIN
          m_status
        ON
          t_condition.status_id = m_status.status_id
        LEFT OUTER JOIN
          m_worktime
        ON
          t_condition.worktime_id = m_worktime.worktime_id";
          
    $sth = $pdo->prepare($sql);

    // (3) SQL実行
    $sth->execute();

    $datas = $sth->fetchAll(PDO::FETCH_ASSOC);

    foreach($datas as $data){
      echo '<pre>';
      var_dump($data);
      echo '</pre>';
    }
      
   
} catch(PDOException $e) {

  // (2) エラーメッセージを出力
  echo $e->getMessage();

} finally {

    $dbh = null;
}
```

## データをテーブルに出力する

```php
<?php
define('DB_HOST', 'localhost');
define('DB_NAME', 'oruca');
define('DB_USER', 'oruca');
define('DB_PASSWORD', 'oruca');

// 文字化け対策
$options = array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET CHARACTER SET 'utf8'");

// PHPのエラーを表示するように設定
error_reporting(E_ALL & ~E_NOTICE);
 
try {
    //データベース接続
   $pdo = new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME, DB_USER, DB_PASSWORD, $options);
   $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
   $sql = "SELECT
          m_member.number,
          m_member.last_name,
          m_member.first_name,
          m_member.sort,
          m_team.team_name,
          m_status.status,
          m_worktime.worktime,
          t_condition.comment
        FROM
          m_member
        INNER JOIN
          m_team
        ON
          m_member.team_id = m_team.team_id
        LEFT OUTER JOIN
          t_condition
        ON
          m_member.member_id = t_condition.member_id
        LEFT OUTER JOIN
          m_status
        ON
          t_condition.status_id = m_status.status_id
        LEFT OUTER JOIN
          m_worktime
        ON
          t_condition.worktime_id = m_worktime.worktime_id";
          
    $sth = $pdo->prepare($sql);

    // (3) SQL実行
    $sth->execute();

    $datas = $sth->fetchAll(PDO::FETCH_ASSOC);

   
} catch(PDOException $e) {

  // (2) エラーメッセージを出力
  echo $e->getMessage();

} finally {

    $dbh = null;
}


?>

<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="format-detection" content="telephone=no">

	<title>oruca練習</title>
  <style>
    table {
      border-collapse: collapse;
      border: 1px solid #ccc
    }
    th {
      border: 1px solid #ccc
    }
    td {
      border: 1px solid #ccc
    }
  </style>
</head>
<body>
  <table>
    <tr>
      <th>number</th>
      <th>last_name</th>
      <th>first_name</th>
      <th>sort</th>
      <th>team_name</th>
      <th>status</th>
      <th>worktime</th>
      <th>comment</th>
    </tr>
    <?php foreach($datas as $data):?>
    <tr>
      <td><?php echo $data["number"]?></td>
      <td><?php echo $data["last_name"]?></td>
      <td><?php echo $data["first_name"]?></td>
      <td><?php echo $data["sort"]?></td>
      <td><?php echo $data["team_name"]?></td>
      <td><?php echo $data["status"]?></td>
      <td><?php echo $data["worktime"]?></td>
      <td><?php echo $data["comment"]?></td>
    </tr>
    <?php endforeach;?>
  </table>
</body>
</html>


```