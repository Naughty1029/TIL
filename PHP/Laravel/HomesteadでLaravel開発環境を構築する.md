Laravel8.xの開発環境を構築する手順

## Laravel日本語ドキュメント
基本的には[こちら](https://readouble.com/laravel/8.x/ja/homestead.html)のドキュメントを参考にすれば問題なく構築できます。

## Laravelの開発環境構築について
Laravelでは開発環境の選択肢がいくつか準備されています。
ドキュメントではDocker DesktopやLaravel Sailなどのコンテナを利用した構築方法を推奨しているようです。

しかし、Dockerに馴染みがない人は、HomesteadというVagrantをベースとして環境構築方法がおすすめです。

## インストールと設定
Homestead環境を起動する前に、Vagrantと、以下のプロバイダのいずれかをインストールする必要があります。

- VirtualBox 6.1.x
- Parallels

Parallelsプロバイダを使用するには、[Parallels Vagrantプラグイン](https://github.com/Parallels/vagrant-parallels)(無料)をインストールする必要があります。

### Homesteadのインストール
まず自分のホストマシンにリポジトリをクローンします。

`~/Homestead`の部分は任意のディレクトリに変更しても大丈夫です。
何か理由がない場合は、自分の全LaravelアプリケーションをホストしておくHomestead仮想マシンはひとつで事足りるので、ルートでもいいのかなとは思います。
クローンしたディレクトリを便宜的に「Homesteadディレクトリ」と呼びます。

```
git clone https://github.com/laravel/homestead.git ~/Homestead
```

リポジトリのクローンを作成したら、releaseブランチにチェックアウトする必要があります。このブランチには、Homesteadの最新の安定版リリースが常に含まれています。

```
cd ~/Homestead

git checkout release
```

次に、Homesteadディレクトリbash init.shコマンドを実行し、Homestead.yaml設定ファイルを作成します。

```
// macOS／Linux
bash init.sh
```

Homestead.yamlはHomesteadディレクトリの直下に生成されます。
基本的にはHomestead.yamlを編集することで開発環境のベースを作ることができます。

## Homestead.yamlを編集する

```yaml:Homestead.yaml

ip: "192.168.56.58" #前回作ったHomesteadなどとかぶらないIPの方が良い
memory: 2048
cpus: 2
provider: virtualbox

authorize: ~/.ssh/id_rsa.pub #自分の公開鍵と同じパス(無い場合は作成)

keys:
    - ~/.ssh/id_rsa #自分の秘密鍵と同じパス(無い場合は作成)

folders:
    - map: ~/Documents/LaravelStudy #localからプロジェクトファイルまでのパス
      to: /home/vagrant/code #vagrantからプロジェクトファイルまでのパス

sites:
    - map: study-app.test #localでアクセスするURL
        to: /home/vagrant/code/study-app/public #vagrant上のrootディレクトリのパス
      
     #もし複数ドメインがある場合はこのようにして追加出来る
    - map: sub.project.test　
        to: /home/vagrant/code/sub_project/public

databases:
    - study-app #DB名
    - sub-project #DBは複数作ることができる

features:
    - mysql: true
    - mariadb: false
    - postgresql: false
    - ohmyzsh: false
    - webdriver: false

services:
    - enabled:
          - "mysql"
#    - disabled:
#        - "postgresql@11-main"

```

基本的に変更する可能性があるところは

- ip
- authorize
- keys
- folders
- sites
- databases

の6つくらいかなと思います。

### ip
ローカルサーバを立ち上げるときに使われるipアドレスです。
他のプロジェクトで使っているipアドレスと被らないように気をつけてください。
vagrant upすると、sites: mapのところで指定したURLでアクセスできるようになります。

なおhostsファイルは、macOSおよびLinuxでは`/etc/hosts`にあるそうです。

### authorizeとkeys
vagrant upで立ち上げた仮想環境にログインするにはssh接続が必要になります。
自分のマシン上でSSH鍵ファイルの作成をしてください。

鍵ファイルが作成できたら、それぞれのパスをyamlファイルに記載します。

### folders
Homestead環境とローカルマシンで共有するプロジェクトを管理するフォルダを指定できます。
フォルダの中のファイルが変更されると、ローカルマシンとHomestead仮想環境との間で同期されます。
mapにはローカル。toにはvagrant上のパスを指定します。

例えば以下のような感じです。
例ではLaravelStudyとcodeが対になります。
LaravelStudyの中で、`project01`と名前でLaravelをインストールしたら、vagrantのcodeディレクトリの中にも同じ名前のLaravelがインストールされます。

**ローカル**
```
Documents
└ LaravelStudy / 
         └ project01/
```

**vagrant**
```
/home/vagrant/
　　　　　└ code / 
     　　　　└ project01/
```

### sites
`map`にはローカルでアクセスするためのURL。`to`にはvagrant上のpublic（Laravelのルートになるところ）ディレクトリのパスを指定します。

### database
DB名を設定します。`vagrant up`すると指定したデータベース名でデータベースが作られることになります。

## Vagrant Boxの実行
Homestead.yamlの編集終えたら、Homesteadディレクトリで`vagrant up`コマンドを実行してください。
Vagrantは仮想マシンが起動し、共有フォルダとNginxサイトを自動的に設定します。

仮想マシンを破壊するには、`vagrant destroy`コマンドを使用します。

## Laravelをインストールする

vagrantへログインするためにSSH接続をします。
```
vagrant ssh
```

ログインができたら、yamlファイルの`files`で指定したプロジェクト管理フォルダに移動します。

```
cd code
```

コンピューターにすでにPHPとComposerがインストールされていれば、Composerを直接使用して新しいLaravelプロジェクトを作成できます。
yamlファイルの`to`で指定したフォルダ名になるようにしてください。

```
composer create-project laravel/laravel:^8.0 study-app
```

あとはyamlファイルで設定したURLにアクセスしましょう。
プロジェクトが立ち上がっているはずです。

