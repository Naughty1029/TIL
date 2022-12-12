### Virtualマシーンとの違い
VM : OSを保有している。起動が遅い。
Docker : ホストOSを共有している。起動が早い！

### installation
https://docs.docker.com/get-docker/

### Docker Images
コンテナの設計図のようなもの
- ランタイム環境（Node versionなど）
- Applicationコード
- 依存関係
- コマンド

読み取り専用
一回作ったら変更しない。変更する場合は新しいimagesを作る

Containerはimageのインスタンス

### imageのレイヤー
#### parent image
OSと時々、ランタイム環境を含む

#### Source Code

#### dependecies

parent imageはDockerHubから入手可能


Dockerfile
```dockerfile
FROM node:17-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 4000
CMD ["node" , "app.js"]
```

docker立ち上げ
```
docker run --name myapp_c2 -p 4000:4000 -d myapp
docker stop myapp_c2
```

```
docker ps
```

```
docker start myapp_c3
```