
```
docker run --name my-db -e MYSQL_ROOT_PASSWORD=rootpassword -d --platform linux/x86_64 -v $PWD/mysql/docker-entrypoint-initdb.d:/docker-entrypoint-initdb.d -v $PWD/mysql/conf.d/charset.cnf:/etc/mysql/conf.d/charset.cnf --net my-net mysql:8.0.29

docker run -v $PWD/sinatra:/opt/myapp -w /opt/myapp -d -p 4567:4567 my-ruby:dockerfile ruby myapp.rb -o 0.0.0.0
```

↓

```yml
version: '3'

services:
  sinatra:
    build: ./sinatra
    command: ruby myapp.rb -o 0.0.0.0
    ports:
      - 4567:4567
    volumes:
      - ./sinatra:/opt/myapp
    working_dir: /opt/myapp
    depends_on:
      - mysql
  mysql:
    image: mysql:8.0.29
    platform: linux/x86_64
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
    volumes:
      - ./mysql/docker-entrypoint-initdb.d:/docker-entrypoint-initdb.d
      - ./mysql/conf.d/charset.cnf:/etc/mysql/conf.d/charset.cnf
```


コンテナ起動！
```
docker-compose up

 docker-compose up -d
```

コンテナをクリーン
```
docker-compose down
```

```
build: ./sinatra
```
```
docker-compose build
```