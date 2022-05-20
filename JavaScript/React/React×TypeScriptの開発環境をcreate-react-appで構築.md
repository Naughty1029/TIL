## この記事に書いてあること
create-react-appを使った、`React×Typescript`の開発環境構築

## create-react-appとは？
Reactの面倒な開発環境をコマンド一発で作成してくれる機能。
Reactを学習したり、新しいシングルページアプリケーションを作成するときに使います。

Node >= 14.0.0 及び npm >= 5.6 の環境が必要です

```
nodebrew list //nodeのバージョン確認
nodebrew use v16.14.0 //nodeのバージョン切り替え
```

## 各パッケージのバージョン
- React v17.0.2
- React-dom v17.0.2
- TypeScript v5.0.0
- husky v7.0.0
- lint-staged v12.3.7
- prettier v2.6.2

## create-react-appする
下記コマンドで開発環境を構築
```
npx create-react-app app --template typescript
```

バージョン変えたい場合は適当なものへ変更しても可
```
npm i react@17.0.2 react-dom@17.0.2 @types/react@17.0.2 @types/react-dom@17.0.2
```

version17.0.2のindex.tsxは下記のように記述する
```javascript
import { StrictMode } from "react";
import ReactDom from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDom.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

下記コマンドで環境が立ち上がるので確認
```
npm run start
```

## tsconfig.jsonを編集
TypeScriptによる型チェックの設定を編集します。

```json:tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "noImplicitReturns": true,//追記 関数戻り値の型注釈を必須にする
    "noUnusedLocals": true,//追記 使われていない変数を禁止する
    "noUnusedParameters": true,//追記 使われていない引数を禁止する
    "baseUrl": "src",//追記 モジュールのパスが絶対パス指定で場合、基準とするフォルダ
  },
  "include": [
    "src"
  ]
}
```

## コミット時のコード自動整形
下記を利用して、コミット時にコードの自動整形がかかるように設定する

- husky
- lint-staged
- prettier

まず必要なパッケージを以下のコマンドでインストール

```
npm i -D husky lint-staged prettier
```

.prettierrc.jsを作成する
```
module.exports = {
  singleQuote: true,
  printWidth: 140,
  trailingComma: 'all',
  arrowParens: 'always',
  semi: true,
  endOfLine: 'lf',
  tabWidth: 4,
};
```

下記コマンドを実行
※huskyの設定方法がv7から変更になったようです。

```
npx husky-init && npm install
```

処理が終わるとpackage.json に以下のような差分ができます。

```json:package.json
{
  "scripts": {
    // ...
    "prepare": "husky install" // 新しく追加
  },
}
```

また`.husky`というディレクトリが作成され、配下にpre-commitというファイルができているので、編集して、プレコミット時にlint-staged が実行されるように設定します。

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged //編集
```

次にpackage.jsonに新しくscriptを追記

```json:package.json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "fix": "npm run format && npm run lint:fix",//追記
    "format": "prettier --write 'src/**/*.{js,jsx,ts,tsx}'",//追記
    "lint:fix": "eslint --fix 'src/**/*.{js,jsx,ts,tsx}'",//追記
    "prepare": "husky install"
  },
```

最後にlint-stagedの設定をして完了です。

```json:package.json
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx}": [
      "npm run fix"
    ]
  }
```

## 参考記事
- https://qiita.com/sanogemaru/items/05c2e9381d6ba2d9fccf
- https://zenn.dev/luvmini511/articles/a47b1aa0310d1a
