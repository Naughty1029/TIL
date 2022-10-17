WordPress 開発での注意点 2. WP-CLI 編
WordPress の開発を行う際に、ローカル環境、開発環境、実運用環境など、いろいろなところで利用することが多い WP-CLI についての注意点です。
使い方などについては、オフィシャルのドキュメントや Qiita に良記事が多いため割愛します。

# どこでも使えるわけじゃないので注意
### CLI ( Command Line Interface) が使えないとダメ
PHP で作成されたプログラムですが、CLI で使用すること前提のもののため、まずターミナル作業が出来るサーバでないと使用することが出来ません。
また、PHP を CLI で実行できる環境でないと当然のことながら使用できないので注意して下さい。

### インストールが必要
CLI で運用するプログラムなので、インストールが必要です。
サーバのユーザエリアにもインストールすることが可能ですので、場所およびパーミッションを確認してインストールしましょう。

### root 権限でインストール
https://wp-cli.org/ja/
これをよんで実行しようｗ

#### Ex. root 権限がないレンタルサーバ等でユーザエリアに WP-CLI をインストール
エックスサーバなどで使用したい場合には、これで対処可能です。
```sh
$ mkdir -p $HOME/bin && curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar $HOME/bin/wp && chmod 755 $HOME/bin/wp
```

### レンタルサーバだとグローバルエリアにインストールされていることもある
さくらインターネットの最新の環境だと、グローバル環境に WP-CLI がインストールされていることがあるので、インストールされているのかどうかを確認しましょう。

# 準備が出来たらまず実行できるか確認しよう
インストールが成功していたら
```sh
$ wp --info
```
を実行することで PHP のバージョンなどの情報を含め表示されますので、確認しましょう。
```sh
$ wp --info
OS:	Linux 4.14.268-205.500.amzn2.x86_64 #1 SMP Wed Mar 2 18:38:38 UTC 2022 x86_64
Shell:	/bin/bash
PHP binary:	/usr/bin/php
PHP version:	7.4.28
php.ini used:	/etc/php.ini
MySQL binary:	/usr/bin/mysql
MySQL version:	mysql  Ver 15.1 Distrib 5.5.68-MariaDB, for Linux (x86_64) using readline 5.1
SQL modes:	
WP-CLI root dir:	phar://wp-cli.phar/vendor/wp-cli/wp-cli
WP-CLI vendor dir:	phar://wp-cli.phar/vendor
WP_CLI phar path:	/home/ec2-user
WP-CLI packages dir:	
WP-CLI global config:	
WP-CLI project config:	
WP-CLI version:	2.5.0
```

# 久しぶりに使う場合にはバージョンの確認を
WordPress のバージョンアップに伴い WP-CLI もバージョンアップがあります。
最新の WordPress の機能に対応するため WP-CLI もバージョンアップします。
自分でインストールした場合には、こまめに確認をしましょう。
- wp cli check-update アップデートがあるか？
- wp cli update WP-CLI のアップデートを実行
### root でインストールした場合には、root でないとアップデート出来ないので注意
root でインストールした場合、配置場所はグローバル環境になります。
そのため各ユーザでもインストールした WP-CLI を使用できるのですが、権限は root ユーザにあるため更新作業を実施する場合には、ルートユーザーで実施する必要があります。
```sh
$ sudo /usr/local/bin/wp cli update
```

# 置換作業

## 一括で書き換える際にはまずは dry-run を
よく使う機能の中でDBの内容を一括で書き換える事があります。
しかしながら一括書き換えのため影響のない部分まで書き換えかねないため、仮実行を行い想定外に書き換えないかを確認しましょう
```sh
$ wp search-replace 'http://dev.example.com' 'https://example.com' --dry-run 
```

## 特定のテーブルで制限も可能
テーブル名を記載することで特定のテーブルのみに範囲を制限することが可能です。
```sh
$ wp search-replace 'http://dev.example.com' 'https://example.com' wp-options
```

## 標準外のテーブルも含める
本番公開やドメイン移転などでドメインが変更になった際などでこのドメイン名の置換作業は多く実施することになります。
しかしながら特定のプラグインなどは、自身用のテーブルを追加しそこを使用している場合があります。
このテーブルについては、WordPress のグローバル変数である、$wpdb に登録されていない場合があり、これらのテーブルが書き換え対象から外れることで、想定外の動作になることがあります。
これらについては、特定のオプションを追加することで、範囲内に含めて実施することが可能になります。

#### 同じテーブルプレフィックス (wp_等) でテーブルが構成されていた場合
```sh
$ wp search-replace 'http://dev.example.com' 'https://example.com' --all-tables-with-prefix
```
WP Offload Media Lite などは wp_as3cf_items というテーブルを作成するため、 --all-tables-with-prefix を指定すれば、置換対象となるためこれでOK

#### テーブルプレフィックスが異なり、DB 内のすべてのテーブルを対象としたい場合
```sh
$ wp search-replace 'http://dev.example.com' 'https://example.com' --all-tables
```

# トラブルシュート
WordPress がエラーで管理画面にアクセス出来なくなるような場合が存在します。
テーマの PHP が原因であれば、その部分をアップすればすぐ直せますが、WordPress 本体のアップデートや、プラグインのアップデートが原因だった場合、ちょっと面倒なことになります。
そのような場合に、WP−CLI 経由で強制的な更新やプラグインの停止を行う事で対処が可能となる場合があります。

## WordPress のメンテナンスモードの変更
WordPress で本体やプラグインのアップデートの際に、メンテナンスモードへ自動的に切り替わり、また戻るようになっていますが、希にエラーでメンテナンスモードから戻らない場合があります。
そのような場合の対処方法です。
#### メンテナンスモード解除
```sh
$ wp maintenance-mode deactivate
```
#### メンテナンスモード設定
```sh
$ wp maintenance-mode activate
```
#### メンテナンスモード確認
```sh
$ wp maintenance-mode status
Maintenance mode is active.
```

## WordPress のデータベースのバックアップ
WordPress 本体に対して何か設定する場合などでも、万が一のことを考え DB のバックアップを取得して置いた方が良い場合があります。
基本的には phpMyAdmin や Sequel、または mysqldump などで目的の DB をまるごとバックアップする方が安全です。
ただ、それらを使用できない場合 WordPress の本体機能を使用してのバックアップを行っていたような場合などで、手動で出来ないような場合には WP-CLI でバックアップを作成することが出来ます。
#### バックアップ作成
```sh
$ wp maintenance-mode activate
$ wp db export --default-character-set=utf8mb4
Success: Exported to 'wordpress_dbase-db72bb5.sql'.
$ wp maintenance-mode deactivate
```
基本的に DB 内の全てのテーブルを対象にエクスポートします。
必要に応じて、--exclude_tables=\<tables\> の様にして特定のテーブルを除外することが可能です。
default-charactor-set については、絵文字などが含まれているような場合、文字化けを防ぐ為に指定します。
#### バックアップからの復帰
```sh
$ wp maintenance-mode activate
$ wp db import wordpress_dbase-db72bb5.sql
Success: Imported from 'wordpress_dbase-db72bb5.sql'.
$ wp maintenance-mode deactivate
```

## WordPress の更新（再インストール）
基本的に自動更新で問題ありませんが、希に自動更新を失敗してしまうことがあり、WordPress が破損することがあります。
そのような場合に強制的に上書きすることで治る場合があります。
#### 通常のアップデートコマンド（最新版）
```sh
$ wp maintenance-mode activate
$ wp core update
$ wp core update-db
$ wp maintenance-mode deactivate
```
ただ、バージョンが最新版にしていた場合では、最新版なので更新されないことがあります。
その場合には強制的に最新版で上書きします。
#### 強制上書きアップデートコマンド（最新版）
```sh
$ wp maintenance-mode activate
$ wp core update --force
$ wp core update-db
$ wp maintenance-mode deactivate
```
まれに特定のバージョンにアップデートした場合、プラグインやテーマでコンフリクトが発生し、動作しなくなってしまう場合があります。
特定のバージョンにしたいような場合には、以下のように指定します。
#### 強制上書きアップデート（ダウングレード）コマンド（指定バージョン）
```sh
$ wp maintenance-mode activate
$ wp core update --version=5.9.2 --force
$ wp core update-db
$ wp maintenance-mode deactivate
```

## プラグインの操作
一番やることが多くなりそうな、特定プラグインの操作です。
プラグインを ON にしたら、管理画面すらアクセス出来なくなったような場合の対処です。
基本的には該当するプラグインのファイルを削除すれば、対処可能ですがすぐに削除できないような場合などで、一旦無効化したいような場合に使用します。

#### プラグインの名前を確認するため情報を一覧表示
```sh
$ wp plugin list
+-----------------------------------+--------+-----------+---------+
| name                              | status | update    | version |
+-----------------------------------+--------+-----------+---------+
| wp-multibyte-patch                | active | none      | 2.2     |
+-----------------------------------+--------+-----------+---------+
```

#### プラグインをすべて無効化する
```sh
$ wp maintenance-mode activate
$ wp plugin deactivate --all
Plugin 'hello' deactivated.
Success: Deactivated 1 of 1 plugins.
$ wp maintenance-mode deactivate
```

#### 特定のプラグインを無効化する
```sh
$ wp maintenance-mode activate
$ wp plugin deactivate hello
Plugin 'hello' deactivated.
Success: Deactivated 1 of 1 plugins.
$ wp maintenance-mode deactivate
```