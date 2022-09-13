## 前提条件
環境構築時にyamlファイルでmysqlを設定

```yaml:Homestead.yaml

features:
    - mysql: true
    - mariadb: false
    - postgresql: false
    - ohmyzsh: false
    - webdriver: false

```

## データベースの確認について
Laravel Homesteadで環境構築した場合、データベースの確認する方法はいくつかあります。
`mysql`を使ってCLIで確認したりもできるし、[Sequel Proなどで接続する方法](https://qiita.com/namizatork/items/7776a33383186cc57307)もあるようですので、好みに応じてググってください。

ぼくはphpMyAdminが好きなので、今回紹介する方法をお勧めしてます。

## phpMyAdminをローカル環境に設置する
[phpMyAdmin](https://www.phpmyadmin.net/downloads/)の公式サイトから、ファイル一式をダウンロードします。

**ダウンロードファイル**
PHP7.1以上
phpMyAdmin-5.1.0-all-languages.zip

PHP5.5以上PHP7.1未満
phpMyAdmin-4.9.7-all-languages.zip

解凍したフォルダは、yamlファイルのfoldersで設定したフォルダ内に設置します。
名前は適当に変更します。

```yaml:Homestead.yaml

folders:
    - map: ~/Documents/LaravelStudy
      to: /home/vagrant/code
```


##  yamlファイルを編集する
次にHomestead.yamlファイルにデータベース情報を反映します。

`sites:` に PhpMyAdmin用の情報を追加します。

```yaml:Homestead.yaml

sites:
    - map: study-app.test
      to: /home/vagrant/code/study-app/public

    - map: phpmyadmin.test #追記
      to: /home/vagrant/code/phpmyadmin #追記
```

## 仮想環境上にphpMyAdminを反映
ローカル上のプロジェクトの場所（Homesteadディレクトリ）に移動してください。

そこで、vagrant upを行います。
yamlファイルの設定を変更したので`--provision`オプションをつけるのを忘れずに。

```
vagrant up --provision
```

## ブラウザ上で表示を確認
yamlファイルで設定したURLにアクセスします。

```
phpmyadmin.test
```

ユーザー名とパスワードはhomestead／secretです。