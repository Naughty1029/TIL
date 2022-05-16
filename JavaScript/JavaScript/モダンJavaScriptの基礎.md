## DOMと仮想DOM
仮想DOMの変更差分をDOMに反映させる

## npmとyarn
昔はJavaScriptが単一のファイル→可読性とコードの再利用
コード分割→依存関係
いま→解決

- 内部でNode.jsが動いている
- 依存関係を勝手に解決
- import先が明示的にわかる世界中で公開されているパッケージを利用可能

npm : パッケージのレジストリ
package.json : 設計書
package.lock.json : 依存関係・バージョン解決
node_modules : モジュールの実態・githubにはアップしない


## ES6以降の記法
ECMA Script（JavaScriptの標準規格）
毎年発表されている
ES2015で機能追加が多くあり、近代JSの転換期
- let / const
- アロー関数
- Class構文
- 分割代入
- テンプレート文字列
- スプレッド構文
- Promise
- etc...

## モジュールバンドラとトランスパイラ
モジュールバンドラ webpack
複数のJSファイルを依存関係を解決して、1つにまとめるもの

トランスパイラ
新しいJavaScriptの記法を古い記法に変換してくれる

## SPA
Single Page Application
モダンJavaScriptはSPAが基本
