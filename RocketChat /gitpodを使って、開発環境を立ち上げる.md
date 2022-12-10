作業時間が月に50時間未満であれば、Gitpodを利用するのが最も手っ取り早くローカル開発環境をたちげることができる。
※50時間以上は有料になる

## gitpodにSSHキーを設定する
アカウント作成後に、Settingsページ→→SSH Keysから公開鍵を登録

SSHキーの生成方法は下記参照 
https://qiita.com/soma_sekimoto/items/35845495bc565c38ae9d

## gitpodへアクセスし、新しいワークスペースを作る
https://gitpod.io にアクセス

Rocket.ChatのGithubプロジェクトURL
https://github.com/RocketChat/Rocket.Chat

または

Rocket.Chatのフォークしたリポジトリへのリンクを指定してワークスペースを作成。

## エディタを開く
VisualStudioCodeを開くボタンがあるので押下

拡張機能 
RemoteSSHとGitpodをインストールする

## meteorのインストール
RocketChatに必要なバージョンのmeteorをインストール
どのバージョンが必要かは、このファイルを[参照](https://github.com/RocketChat/Rocket.Chat/blob/develop/apps/meteor/.meteor/release)

以下のコマンドを実行し、インストール
```
curl https://install.meteor.com/?release=○.○.○ | sh
```

新しくインストールしたmeteorをパスに追加

```
export PATH=$PATH:/home/gitpod/.meteor
```

## nodeのバージョンを切り替える
rootディレクトの[package.json](https://github.com/RocketChat/Rocket.Chat/blob/develop/package.json)の中に必要なnodeのバージョンの記載があるので、下記コマンドでインストール

```
nvm install 14.19.3
```

## yarnコマンド実行
`yarn.lock`を削除

nodeの依存関係をインストール
```
yarn
```

Rocket.Chatサーバー起動のために、下記コマンドでROOT_URLを設定

```
export ROOT_URL=$(gp url 3000)
```

最後に、Rocket.Chatサーバを構築して起動

```
yarn build
yarn dev
```
