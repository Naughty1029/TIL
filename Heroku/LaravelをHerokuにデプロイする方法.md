## Heroku CLIインストール

まずはHeroku CLIをインストールします。

windowsは下記リンク参照

[https://devcenter.heroku.com/articles/heroku-cli#download-and-install](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)

```
# herokuインストール
$ brew tap heroku/brew && brew install heroku

# 下記コマンドでのインストールは公式非推奨
$ npm install -g heroku

# バージョン確認
$ heroku --version
```

## Herokuに新規アプリ作成

まずはHerokuにログインします。

```
heroku login
```

ログインする

Herokuにログインできたら、新しいアプリを作成します。下記コマンド実行します。

```
heroku create
```

下記のように表示され、アプリが作成されます。

```
Creating app... done, ⬢ [herokuアプリケーション名]
https://[herokuアプリケーション名].herokuapp.com/ | https://git.heroku.com/[herokuアプリケーション名].git
```

## PostgreSQLの追加

Herokuのダッシュボードにログインするとアプリ一覧が表示されるので先ほど作成したアプリをクリックします。

次に、メニュータブより「Resources」をクリックします。

「Add-ons」の検索ボックスに「postgres」と入力すると「Heroku Postgres」が表示されるので、インストールします。

以上でデータベースのアドオンが完成です。

次に、データベース接続の設定を行います。下記コマンドを実行します。

```
heroku config:get DATABASE_URL
```

データベースの接続情報を確認するコマンドです。（Heroku Postgres を追加した時点で、接続情報は設定されています）

こちら実行すると、下記のように表示されます。

```
postgres://aaabbb:cccddd@ec2-abc-def-ghi.compute-1.amazonaws.com:5432/xyz123
```

それぞれをconfig:setコマンドにてセットしていきます。下記実行します。

```
heroku config:set DB_CONNECTION=pgsql
heroku config:set DB_HOST=ec2-abc-def-ghi.compute-1.amazonaws.com
heroku config:set DB_DATABASE=xyz123
heroku config:set DB_USERNAME=aaabbb
heroku config:set DB_PASSWORD=cccddd
```

## Herokuにデプロイする

まず Procfile という 設定ファイルを作成します。Laravelのルートディレクトリに移動し、下記実行します。

```
# ファイル作成
$ touch Procfile

# ファイル編集
$ vi Procfile

#  iでINSERTモードにし、下記内容を書き込む
$ web: vendor/bin/heroku-php-apache2 public/

# escでINSERT終了し、:wqで保存して閉じる
```

次にファイルをHerokuにアップします。HerokuへのアップロードはGitを利用します。

Laravelルートディレクトリにて、下記実行します。

```
git init
heroku git:remote -a [herokuアプリケーション名]
git add .
git commit -m "first commit"
git push heroku master
```

これでファイルがHerokuにアップロードできました。

次に**APP_KEY** の設定を行います。下記実行します。APP_KEYはセキュリティ等の機能で暗号化に利用される設定項目です。（APP_KEYがないと Laravel は動かないようです。）

```
heroku config:set APP_KEY=$(php artisan --no-ansi key:generate --show)
```

最後にデータベースのマイグレーションを行います。下記実行します。

```
heroku run "php artisan migrate"
```

## アプリ情報設定

```
# デバッグを有効にする
$ heroku config:set DEBUGBAR_ENABLED=true
```

## 参考リンク
[Laravel を Heroku にデプロイする方法](https://note.com/koushikagawa/n/n203ed82e95ff)
[Laravelのアプリケーションのherokuへのデプロイ手順](https://qiita.com/ktanoooo/items/6fd4fc6617953fdbc7db)
