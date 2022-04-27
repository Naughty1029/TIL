Homestead前提

## Laravel Mix
**tsメソッド**
- 既存のmix.js()の機能セットの上に構築されている。
- 必要なTypeScriptパッケージのインストールと、`typescript` `ts-loader`追加され、webpack設定の更新も行われる。

**mixのjavascriptバンドルの特徴（jsメソッド）**
- 最新のJavaScript構文をコンパイルします。
- モジュールのバンドル
- 本番環境での圧縮

**reactメソッド**
Reactサポートに必要なBabelプラグインを自動的にインストール

```js
 mix.ts('resources/ts/index.tsx', 'public/js')
    .react()
    .sass('resources/sass/app.scss', 'public/css')
    .sourceMaps()
    .browserSync({
        host: 'todo-app.test',
        proxy: {
            target: 'http://todo-app.test',
        },
        files: [
            './resources/**/*',
            './public/**/*',
        ],
        open: false,
    });
```

何回か、mixを起動すると必要なパッケージが自動インストールされる
```text
npm run dev
```

```json
"devDependencies": {
		"@babel/preset-react": "^7.16.7",
		"@types/react": "^18.0.8",
		"@types/react-dom": "^18.0.0",
		"browser-sync": "^2.27.9",
		"browser-sync-webpack-plugin": "^2.3.0",
		"laravel-mix": "^6.0.6",
		"react": "^17.0.2",
		"react-dom": "^17.0.2",
		"resolve-url-loader": "^5.0.0",
		"sass": "^1.51.0",
		"sass-loader": "^12.6.0",
		"ts-loader": "^9.2.9",
		"typescript": "^4.6.3"
}
```

## React / ReactDOMのインストール
```text
npm i -D react react-dom
```

## TypeScript 型情報インストール

```text
npm i -D @types/react @types/react-dom
```

## 起動
myurl.test:3000でアクセス。
ブラウザシンクがつながっているか確認

ちなみに参考記事
browserSync難しい問題
https://kore1server.com/373/Laravel5.5%E3%80%81Mix%E3%81%AEBrowserSync

```text
npm run watch-poll
```

## eslint prettier

下記参照
https://eslint.org/docs/user-guide/getting-started
https://zenn.dev/jpn_asane/articles/d7f44682b74fdc
