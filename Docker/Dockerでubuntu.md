```
docker run ubuntu:20.04 echo hello world
```

ubuntuのbashを起動させるコマンド

```
docker run -it ubuntu:20.04 bash
```

コンテナ一覧を表示させる

```
docker ps

//停止しているコンテナも表示させる
docker ps -a
```

コンテナからイメージを作成する
```
docker commit dockerID イメージ名
docker commit e3c747dc4a30 my-ruby:commit
```
※docker commit は使わない
→環境構築の手順がわからない

代わりにDockerfileを作成する

```Dockerfile
FROM ubuntu:20.04 

RUN apt update
RUN apt install -y ruby ruby-bundler
```

Dockerfileからimageをビルドする
```
docker build -t my-ruby:dockerfile .

docker run -it my-ruby:dockerfile bash
```

ボリュームによるファイルの共有
- ファイルの編集をローカルないのIDEなどで編集したい
- コンテナを削除してもファイルを残しておきたい

```
docker run -it -v $PWD:/opt/myapp -w /opt/myapp my-ruby:dockerfile bash

-v ホストのディレクトリ:コンテナのディレクトリ
→マウント！

-w コンテナのディレクトリ
→カレントディレクトリを指定できる
```


```Dockerfile
FROM ubuntu:20.04

RUN apt update
RUN apt install -y ruby ruby-bundler

COPY Gemfile .

RUN apt install -y ruby-dev build-essential libmariadb-dev
RUN bundle install
```

```
docker run -v $PWD/sinatra:/opt/myapp -w /opt/myapp -d my-ruby:dockerfile ruby myapp.rb
```

```
//ssコマンド実行ファイル
apt install iproute2
ss -antup //portの確認ができる！
```

```
docker exex -it id bash
```

ホストとコンテナはネットワークが分離されているので、コンテナのポートを指定しても、アクセスできない。

ホストのポートへのアクセスをコンテナのポートにマッピングすれば、コンテナのアプリケーションにアクセスできる！

```
-p ホストのポート：コンテナのポート
//ipアドレスも変更

docker run -v $PWD/sinatra:/opt/myapp -w /opt/myapp -d -p 4567:4567 my-ruby:dockerfile ruby myapp.rb -o 0.0.0.0
```

dockerのコンテナ同士を接続させるにはネットワーク関係の設定をしてあげる必要がある。

Dockerのネットワークを作る
```
docker network create my-net

--net my-net //これで所属
```

```
docker run --name my-db -e MYSQL_ROOT_PASSWORD=rootpassword -d --platform linux/x86_64 -v $PWD/mysql/docker-entrypoint-initdb.d:/docker-entrypoint-initdb.d --net my-net mysql:8.0.29

docker run -v $PWD/sinatra:/opt/myapp -w /opt/myapp -d -p 4567:4567 --net my-net my-ruby:dockerfile ruby myapp.rb -o 0.0.0.0
```

```
//コンテナ名がネットワーク名になる
localhostからmy-dbに変更
```