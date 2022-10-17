## この記事に書いてあること
サイト・ページのデータ一式（HTML・画像・CSS・JSなど）をダウンロードする方法です。
コーディング時、サイトの共通パーツが欲しい場合などに、お試しください。

※対象はmacです。作業はターミナルです。wgetというコマンドを使用します。

## 準備
まずは、homebrewというmac用パッケージマネージャーをインストール。
その後、homebrewを使用してwgetというコマンドをインストール。

### homebrewのインストール
バージョン確認コマンドで、バージョンが表示されたらインストール済み。
```cmd:homebrewのバージョン確認
brew --version
```
```cmd:homebrewのインストール
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### wgetのインストール
バージョン確認コマンドで、バージョンが表示されたらインストール済み。
```cmd:wgetのバージョン確認
wget --version
```
```cmd:wgetのインストール
brew install wget
```

**参考サイト**
https://brew.sh/index_ja
https://webkaru.net/dev/mac-wget-command-install/


## データのダウンロード

まずは作業用フォルダに移動。
どこでも良ければ下記コマンドでデスクトップに作業用フォルダを作成して移動。

```cmd:作業用ディレクトリ作成＆して移動
mkdir ~/Desktop/wget`date '+%Y%m%d%H%M'` || cd ~/Desktop/wget`date '+%Y%m%d%H%M'`
```

### コマンドの実行
コマンド実行してダウンロード。オプションの指定でいろいろできます。

####  HTMLだけダウンロード
```
wget https://5star.co.jp/
```

####  HTMLと参照しているリソースをダウンロード（おすすめ）
```
wget -p https://5star.co.jp/
```

#### サイトまるごと（再帰的に）ダウンロード
```
wget -p -m -E https://5star.co.jp/
```

#### HTML内のパスの記述をローカル用に変更
```
wget -p -k https://5star.co.jp/
```

#### 外部サーバのリソースもダウンロード
```
wget -p -E -k -H https://5star.co.jp/
```

#### UA変えてダウンロード
```
wget -p -E --user-agent="Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1" https://5star.co.jp/
```
#### Cookie 認証用に Cookie 情報を付加してダウンロード
```
wget --header 'Cookie: key=value' -r -k -E https://5star.co.jp/
```

#### リンク先の特定の他ドメインも取得する場合（下記の場合サブドメインも含む）
```
wget -rkEH https://www.example.com/ -t 3 -D example.jp,example.com -l 10
```

> ダウンロード開始後に「しまった！間違えた！」と思ったときは
> **ctrl + c** でキャンセル（中断）。

### オプションの説明
#### -p
HTMLが参照しているリソース（画像・CSS・JS等）もダウンロードします。

#### -E
HTMLファイル名の末尾が「.html」じゃない場合、「.html」を付与します。

#### -k
HTML内のリソースへのパスの記述を、参照可能なように相対パスに変換します。

#### -r
リンクをたどっていき、再帰的にダウンロードを行います。

#### -l
-r で再帰的にダウンロードを行う際に、ダウンロードを実施するディレクトリの階層の深さを指定します。
0 を指定した場合は無制限となります。

#### -N
ローカルにダウンロードしてあるファイルとタイムスタンプを比較し、新しいものだけをダウンロードします。
差分取得したい場合に使用します。

#### -m
-N -r -l 0 --no-remove-listing の省略形

#### -H
外部サーバにあるリソースもダウンロードします。

#### -t
エラーの場合のリトライの回数を指定します。

#### -D
ダウンロードを実施するドメインを、カンマ区切りで指定します。

#### --user-agent
指定のUserAgentで、ダウンロードします。

#### --header=STRING
指定の STRING を HTTP ヘッダに付けて送信します。
Cookie や BASIC 認証を使用する場合に使用します。

**参考URL**  
https://homemadegarbage.com/wget-dl  
https://4thsight.xyz/427  
https://www.youfit.co.jp/archives/2208


## 注意事項
※JSで動的に取得する画像やCSSはダウンロードできません。
※HTMLからの参照にパラメータ付与されている場合、ダウンロードしたファイル名にもパラメータが付きます。