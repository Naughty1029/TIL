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