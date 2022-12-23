### EC2インスタンスを準備する
- DBとしてふるまうようにしたいので、Privateサブネットに配置するのがいいと考えるが、とりあえず動作の都合上、パブリックサブネットに配置してください。

- EIPを割り当て、パブリックIPを固定化します

- セキュリティグループで以下ポート開放設定をする
    - SSH：22
    - MongoDB：27017（カスタムTCP・Mongoのデフォルトポート）

以上、EC2インスタンスが立ち上がったら、SSHログインする。次からの作業はEC2インスタンスにログインした状態で実施する。

### MongoDB Community Editionのインストール
- Mongoのバージョンによってインストール時のコマンドが若干異なるので、公式ドキュメントを確認しながら行うこと
- パッケージ管理システムで使用されている公開鍵をインポートします
```
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
```
- オペレーションはOKで応答
- MongoDB用のリストファイルを作成
```
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
```
- ローカルパッケージのデータベースを再読み込み
```
sudo apt-get update
```
- 最新の安定版をインストール
```
sudo apt-get install -y mongodb-org
```

※特定のリリースをインストールするには、次の例のように、バージョン番号とともに各コンポーネントパッケージを個別に指定する必要がある
```
sudo apt-get install -y mongodb-org=6.0.3 mongodb-org-database=6.0.3 mongodb-org-server=6.0.3 mongodb-mongosh=6.0.3 mongodb-org-mongos=6.0.3 mongodb-org-tools=6.0.3
```
意図しないアップグレードを防ぐために、現在インストールされているバージョンでパッケージを固定
```
echo "mongodb-org hold" | sudo dpkg --set-selections
echo "mongodb-org-database hold" | sudo dpkg --set-selections
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-mongosh hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections
```

### MongoDBの起動

- lintシステムの確認
- `systemd`か、`init`かを確認
```
ps --no-headers -o comm 1
>>> systemd
```
- 以下、systemd の手順で実施
- 以下のコマンドで、mongodのプロセスを開始
```
sudo systemctl start mongod
```
- MongoDBが正常に起動したことを確認
```
sudo systemctl status mongod
```
※次のコマンドを実行することで、システムの再起動後にMongoDBが起動するようになる
```
sudo systemctl enable mongod
```
- MongoDBを停止
```
sudo systemctl stop mongod
```

### Ubuntu外からのアクセスを許可する
- 設定ファイルを開く
```
sudo vi /etc/mongod.conf
```
- すべてのIPからのアクセスを許可  
※実際のIP制限はEC2のセキュリティグループで実施
```
# network interfaces
net:
  port: 27017
  # bindIp: 127.0.0.1
  bindIp: 0.0.0.0
```

- MongoDBを起動
```
sudo systemctl start mongod
```

### エラー対応
`var/lib/mongodb`と`/tmp/mongodb-27017.lock`のパーミッション設定が原因でエラーが出るらしいので、所有者を monogdb ユーザに変更する必

```
sudo chown -R mongodb:mongodb /var/lib/mongodb
sudo chown mongodb:mongodb /tmp/mongodb-27017.sock
```

### そのほか、実運用で考慮しないといけないこと
- データベースのユーザー認証機能の設定をする（デフォルトだと設定されていない）
- Privateサブネットに配置しつつ、Mongo Compassでつなげるようにする


### 参考リンク先
- [Install MongoDB Community Edition on Ubuntu](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)
- [AWS上のUbuntu20.04にMongoDB4.4.1を構築する（インストールから外部接続まで）](https://www.yokoyan.net/entry/2020/10/26/180000)
- [MongoDB loads but breaks, returning status=14](https://askubuntu.com/questions/823288/mongodb-loads-but-breaks-returning-status-14)
