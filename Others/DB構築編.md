第１章：ローカル開発環境のMySQLにDBとユーザーを作成する
第２章：ローカル開発環境にphpMyAdminをインストールする
第３章：テスト環境（oruca.test5s.com）の phpMyAdmin でみんなでテーブルを作成
第４章：ローカル開発環境にインポート

# 第１章 ローカル開発環境のMySQLにDBとユーザーを作成する

MySQL上にデーターベース **oruca** を作成します。
また、このデータベースを操作するようのユーザー **oruca** も作成します。

MySQLの操作は、SQLという命令文で行います。
今回は、コマンドラインでSQLを使い、データベースとユーザーを作っていきます。

まずは、仮想サーバの起動。作業フォルダ **oruca** をVSCodeで開き、ターミナルで...
```
vagrant up
```

その後、ゲストOS（Ubuntu）にログイン。
```
vagrant ssh
```
ログインしたら、ユーザを root に変更。
```
sudo su
```
MySQL に root でログイン。
```
mysql -u root
```

## データベースの作成
まずは、MySQLのデータベースの一覧を見てみましょう。
```
SHOW DATABASES;
```
![スクリーンショット 2022-06-27 10.40.11.png](https://image.docbase.io/uploads/2c67b0cb-02e7-44c3-9c50-419bce288176.png =800x)

ではデータベースを作ります。
データベースを作成するSQL文は、**CREATE DATABASE データベース名** です。
```
CREATE DATABASE oruca;
```
「Query OK, 1 row affected (... sec)」と表示されれば、たぶん成功です。

> **SQL文の大文字・小文字**
> SQLの命令の箇所を、テーブル名やカラム名と区別しやすくするために、大文字で書くという慣例がありますが、小文字でもかまいません。

作成できたか、データベースの一覧で確認しましょう。
```
SHOW DATABASES;
```
![スクリーンショット 2022-06-27 10.48.27.png](https://image.docbase.io/uploads/f12ef3a0-9a43-4580-8ab0-1fd4a44bad5a.png =800x)


## ユーザーの作成

まずは、既存のユーザーを確認しましょう。
```
SELECT user,host FROM mysql.user;
```
![スクリーンショット 2022-06-27 10.49.39.png](https://image.docbase.io/uploads/e9efc9be-8abc-4496-adf1-a7058bd81f90.png =800x)


> **ホスト（host）について**
> 
> ホストは、どのマシンからアクセスするかというユーザーかという指定。
> localhost は、MySQLが動いている同じマシンからアクセスするユーザーです。
> 別のマシンからアクセスするユーザーや、ワイルドカード（%）で、どこからでもアクセスできるユーザーも作れます。
> 
> ユーザー名が同じでホストが違う別のユーザーも作れます。
> oruca@localhost さんと oruca@% さんは別人です。（ユーザー名@ホスト名）
> takeuchi@5star.co.jp と takeuchi@example.com くらい別人です。

では、ユーザーを作成しましょう。
localhost からアクセスする oruca というユーザーを作成します。
ユーザーの作成するSQL文は、**CREATE USER ユーザー名@ホスト名** です。
```
CREATE USER oruca@localhost;
```

作成できたか確認しましょう。
```
SELECT user,host FROM mysql.user;
```
![スクリーンショット 2022-06-27 10.53.11.png](https://image.docbase.io/uploads/71e15732-abfd-47df-9b86-54395b5fe0de.png =800x)

### ユーザーのパスワードを設定する
デフォルトだとパスワードが設定さえていないので、設定します。パスワードも "oruca" で。
```
SET PASSWORD FOR oruca@localhost = 'oruca';
```

### ユーザーに権限を与える
MySQLのユーザー権限は、MySQL全体や、データベース・テーブルごとに、どの操作が可能か、細かく設定できます。
権限設定のSQL文は **GRANT [許可する操作] ON [許可するデータベース].[許可するテーブル] TO [許可するユーザー]** です。
今回は、**oruca** というユーザーに対して、**oruca** というデータベースへの全ての操作を許可します。
```
GRANT ALL ON oruca.* TO oruca@localhost;
```

権限確認してみる
```
SHOW GRANTS FOR oruca@localhost;
```
![スクリーンショット 2022-06-27 11.20.02.png](https://image.docbase.io/uploads/bdf2e872-d7b4-4ba3-a3bd-8e73a95c0136.png =800x)

> 権限設定について、詳しくは下記
> https://www.dbonline.jp/mysql/user/index6.html

ということで、以上で完了です。


# 第２章 ローカル開発環境にphpMyAdminをインストールする

MySQLはSQL文で操作しますが、便利なGUIツールもいくつかあります。
その中のひとつが phpMyAdmin で、PHPで作られたウェブアプリケーションです。
今回はこちらで、DBの構築を行います。

## インストール
まずは下記からダウンロードしてください。
https://www.phpmyadmin.net/

ダウンロードしたZIPを展開し、フォルダ名を **phpmyadmin** に変更した上で、ホストOS（mac）の **oruca/public** フォルダ 配下に移動します。
![スクリーンショット 2022-06-24 11.42.39.png](https://image.docbase.io/uploads/4903bfa5-d401-498e-a9bc-2ae175e795e3.png =700x)

ブラウザで下記のURLにアクセスするとログイン画面が表示されます。
http://oruca.local/phpmyadmin/
![スクリーンショット 2022-06-24 11.45.57.png](https://image.docbase.io/uploads/ba1e502b-9b03-42a9-8daa-bc658f8f4626.png =700x)

ユーザー名 : oruca / パスワード : oruca でログインしてください。
![スクリーンショット 2022-06-24 19.16.17.png](https://image.docbase.io/uploads/69495ff4-1eaf-49e4-b0d4-b981d8514d97.png =700x)

# 第３章 テスト環境（oruca.test5s.com）の phpMyAdmin でみんなでテーブルを作成

各テーブルを手分けして作成したいのですが、それぞれの環境で作業すると、合体が面倒くさいです。
なので、oruca.test5s.com に用意してくれたデータベースと phpMyAdmin を使って、みんなで作業しましょう。

https://oruca.test5s.com/phpmyadmin/

ログイン情報は下記をご確認ください。
https://docs.google.com/spreadsheets/d/1tWWfU3toBdajJif_0MOfTXc2UXkQNFzbdmt-xkhJmJk/edit#gid=1

## テーブルの作成
![スクリーンショット 2022-06-29 17.21.59.png](https://image.docbase.io/uploads/671ccf41-6a0d-4005-9d99-ff2aa12c5f26.png =WxH)

テーブル作成時の各項目の説明です。

### 名前
カラム名を入力します。

### タイプ
データ型を指定します。

**[使用頻度が高そうなデータ型]**
・数値型 - 整数：INT / SMALLINT / TINYINT / MEDIUMINT / BIGINT
・数値型 - 浮動小数点数型：FLOAT / DOUBLE
・文字列型：VARCHAR / TEXT / BLOB
・日付型：DATETIME / TIMESTAMP

※データ型について詳しくは下記参照
https://dev.mysql.com/doc/refman/8.0/ja/data-types.html
https://26gram.com/mysql-data-types

※ VARCHAR と TEXT の違い
https://style.potepan.com/articles/19193.html

### 長さ/値
文字列型の文字数や数値型の桁数を指定します。

※詳しくは下記参照
https://oreno-it3.info/archives/350
https://dev.mysql.com/doc/refman/5.6/ja/char.html

### デフォルト値
値が指定されなかった場合に適用されるデフォルト値を指定します。

・なし：空文字
・ユーザー定義：設定した値
・NULL：NULL（NULLを許可した場合）
・CURRENT_TIMESTAMP：現在日時（TIMESTAMP型やDATETIME型に有効）

※MySQL 5.6.5 以降のCURRENT_TIMESTAMPについて
https://dev.mysql.com/doc/refman/5.6/ja/timestamp-initialization.html

### 照合順序
照合順序を指定。
照合順序とは、DBを検索した時に、a == A と判定するか等のことらしい。
未指定の場合は、テーブルの設定が引き継がれる（と思う）

※称号順序について詳しくは下記参照
https://mita2db.hateblo.jp/entry/2020/12/07/000000

### 属性
・BINARY：称号順序が文字コードで行われるようになる？（よくわかんね）
・UNSIGNED：数値の+-の符号なし（扱える数字の範囲は倍になる）
・UNSIGNED ZEROFILL：UNSIGNEDにくわえて、ゼロで桁数埋める。1じゃなくて0001みたいな。
・on update CURRENT_TIMESTAMP：更新時に現在日時を設定してくれる

**NULL**
NULLを許可するかどうかのチェックボックス

**インデックス**
PRIMARY：プライマリーキー（主キー）にする / PRIMARY制約を設定する / インデックスも作成される
UNIQUE：UNIQUE制約を設定する / インデックスも設定できる
INDEX：制約を設けないインデックスを設定する
FULLTEXT：https://dev.mysql.com/doc/refman/5.6/ja/innodb-fulltext-index.html
SPATIAL：https://dev.mysql.com/doc/refman/5.6/ja/creating-spatial-indexes.html

井村さんのチャット拝借。
> idnex は文字通りこのフィールドに index 設定しますって話ですね。
> 今回の oruca では不要ですが、例えば名前とかをよく検索するような場合に、名前のフィールドにインデックス設定することがあります。
> インデックスとは？仕組みをわかりやすく解説 (sint.co.jp)
> https://products.sint.co.jp/siob/blog/index

### AI
AUTO INCLEMENTといって、自動で番号を１ずつプラスしてくれる。
IDなどに使用。
チェックするとインデックスに PRIMARY が設定される

### コメント
わかりやすいようにコメントが残せます。

### カラムを移動させる
ときに指定します。

### テーブルのコメント
テーブルに対してのコメントです

### 照合順序（テーブルの照合順序）
テーブルの照合順序の設定です。
未指定の場合はデータベースの設定が引き継がれます（と思う）

### ストレージエンジン
https://qiita.com/ishishow/items/280a9d049b8f7bcbc14a

旧標準：MyISAM
>- 利点…シンプル、高速に動作、フルテキスト検索に対応
>- 欠点…トランザクションや外部キー制約をサポートしない、REPAIR TABLEで修正できることが多いがクラッシュ時に使えなくなる、テーブルレベルでロックをかけるという点でロックの粒度が荒い

現標準：InnoDB
> - 利点…トランザクションをサポート、外部キー制約が装備されている、クラッシュ時のリカバリに対応、列レベルでロックを実施
> - 欠点…フルテキスト検索ができない、パフォーマンスが悪い

https://oc-technote.com/mysql/myisam%E3%81%A8innodb%E3%81%AE%E9%81%95%E3%81%84/
https://qiita.com/ishishow/items/280a9d049b8f7bcbc14a


# 第４章 ローカル開発環境にインポート
## さくらサーバーの phpMyAdmin でデータをエクスポート

## ローカル開発環境の phpMyAdmin でデータをインポート

## 照合順序を変えておく
照合順序とは、DBを検索した時に、a == A と判定するか等のことです。
詳しくは下記を。
https://mita2db.hateblo.jp/entry/2020/12/07/000000

現在の設定では、デフォルトで "utf8mb4_0900_ai_ci" となっていると思います。
みなさんで作ったさくらサーバーでDBの設定は、"utf8mb4_general_ci" になっているので、ローカル開発環境も、"utf8mb4_general_ci" にあわせておきましょう。

SQL文での変更も可能ですが、せっかくなので GUIで変更します。

1. http://oruca.local/phpmyadmin/ にアクセス。（ ユーザー名 : oruca / パスワード : oruca でログイン）
2. 左ナビからデータベース "oruca" を選択
3. 上部タブ「操作」を選択
4. 少し下にスクロールして、「照合順序」から、"utf8mb4_general_ci" を選択
5. 実行ボタンをクリック

![スクリーンショット 2022-06-24 19.17.37.png](https://image.docbase.io/uploads/0aebd948-3866-4bde-b87c-e3e838a40baf.png =700x)

