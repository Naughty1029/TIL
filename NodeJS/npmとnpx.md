## 参考リンク先
[npm vs npx — What’s the Difference?](https://www.freecodecamp.org/news/npm-vs-npx-whats-the-difference/)

## npmとは？
npm (node package manager) は、Node.js をインストールするとすぐに利用できるパッケージマネージャ

Node.jsのライブラリとアプリケーションのバージョンと依存関係を管理できる

### npmでパッケージを実行するには？
package.jsonファイルにそのパッケージを指定する必要がある

npmでパッケージをインストールすると、その実行ファイルのコマンドがインストールされる

- ローカルインストールした場合、`./node_modules/.bin/`配下
- Globalにインストールした場合、Linuxだと`/usr/local/bin/`配下

これを実行するには通常、次のようにローカルパスを入力する必要がある
```
./node_modules/.bin/your-package
```

もしくは、CLIツールがあれば、以下のようにscriptsセクションのpackage.jsonファイルに追加して実行することができる

```json
{
  "name": "your-application",
  "version": "1.0.0",
  "scripts": {
    "your-package": "your-package"
  }
}
```

npm run コマンドで実行
```
npm run your-package
```

## npxとは？
npm v5.2.0以降からプリセットでついてくるパッケージランナー。
npm経由でインストールするようなNode.jsベースのパッケージファイルを簡単に実行できる。

npxがインストールされているか確認
```
which npx
```

もしインストールされていない場合は下記でインストール
```
npm install -g npx
```

### ローカルインストールされたパッケージの実行を簡単にできる
ローカルにインストールされたパッケージを実行したい場合は、次のように入力
scriptに記述したり、npm run コマンドは不要
```
npx your-package
```

### ローカルインストールされていないパッケージの実行
インストールされていないパッケージも実行できる
下記を実行してテスト

```
npx cowsay wow	
```

CLIツールをテストしたいが、ディスクスペースを節約したい。
必要なときだけ実行できるようになる。


