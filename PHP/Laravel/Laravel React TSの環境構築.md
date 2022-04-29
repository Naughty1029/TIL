```text
composer create-project laravel/laravel:^8.0 todo-app
```

sqlight

```text
touch database/database.sqlite
```

gitignore
```
database/database.sqlite
```



## Laravel Mix
**tsメソッド**
- 既存のmix.js()の機能セットの上に構築されている。
- 必要なTypeScriptパッケージのインストールと、`typescript` `ts-loader`追加され、webpack設定の更新も行われる。

**mixのjavascriptバンドルの特徴（jsメソッド）**
- 最新のJavaScript構文をコンパイルします。
- モジュールのバンドル
- 本番環境での圧縮

```js
mix.ts('resources/ts/index.tsx', 'public/js')
    .react()
    .sass('resources/sass/app.scss', 'public/css');
```

nodemodulesつくる
```text
npm install
```

不要なもの削除。mixを起動。
```
npm uninstall loadsh postcss
npm run prod
```

packageインストールされる

```json
"devDependencies": {
	"@babel/preset-react": "^7.16.7",
	"axios": "^0.21",
	"laravel-mix": "^6.0.6",
	"lodash": "^4.17.19",
	"resolve-url-loader": "^5.0.0",
	"sass": "^1.51.0",
	"sass-loader": "^12.6.0",
	"ts-loader": "^9.2.9",
	"typescript": "^4.6.3"
}
```

Reactのインストール

```text
npm i -D react@17.0.2 react-dom@17.0.2 @types/react @types/react-dom
```

```json
"devDependencies": {
	"@babel/preset-react": "^7.16.7",
	"@types/react": "^18.0.8",
	"@types/react-dom": "^18.0.0",
	"axios": "^0.21",
	"laravel-mix": "^6.0.6",
	"lodash": "^4.17.19",
	"react": "^17.0.2",
	"react-dom": "^17.0.2",
	"resolve-url-loader": "^5.0.0",
	"sass": "^1.51.0",
	"sass-loader": "^12.6.0",
	"ts-loader": "^9.2.9",
	"typescript": "^4.6.3"
}
```

typescriptの設定

```text
tsc --init --jsx react
```

下記変更
```
"jsx": "react-jsx",
```

ファイル作成
resources/sass/app.scss
resources/ts/index.tsx
```react
import ReactDOM from 'react-dom';
import { App } from './App';

ReactDOM.render(
    <App />,
    document.getElementById('app')
)

```

ついでにApp.tsx
```react
export const App = ()=>{
    return(
        <h1>Laravel SPA</h1>
    )
}
```

welcome.blade.phpをindex.blade.phpに変更

```html
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laravel</title>
        <link rel="stylesheet" href="/css/style.css">
    </head>
    <body>
        <div id="app"></div>
    </body>
    <script src="/js/index.js"></script>
</html>
```

web.php変更
```php
Route::get('/', function () {
    return view('index');
});
```

これでいったんは表示される

webpack.mix.jsでバージョン管理

```js
if(mix.inProduction()){
    mix.version();
}
```

読み込みをmixへルパで

```html
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laravel</title>
        <link rel="stylesheet" href="{{mix('css/app.css')}}">
    </head>
    <body>
        <div id="app"></div>
    </body>
    <script src="{{mix('js/index.js')}}"></script>
</html>
```


## eslint prettier

- https://eslint.org/docs/user-guide/getting-started
- https://betterprogramming.pub/comparing-the-top-three-style-guides-and-setting-them-up-with-eslint-98ea0d2fc5b7
- https://zenn.dev/jpn_asane/articles/d7f44682b74fdc


```text
npm install eslint --save-dev
```

```text
npx eslint --init
```

style guideはairbnbを指定

たくさんパッケージが追加される
```json
	"@babel/preset-react": "^7.16.7",
	"@types/react": "^18.0.8",
	"@types/react-dom": "^18.0.0",
	"@typescript-eslint/eslint-plugin": "^5.21.0",
	"@typescript-eslint/parser": "^5.21.0",
	"axios": "^0.21",
	"eslint": "^8.14.0",
	"eslint-config-airbnb": "^19.0.4",
	"eslint-plugin-import": "^2.26.0",
	"eslint-plugin-jsx-a11y": "^6.5.1",
	"eslint-plugin-react": "^7.29.4",
	"eslint-plugin-react-hooks": "^4.5.0",
	"laravel-mix": "^6.0.6",
	"lodash": "^4.17.19",
	"react": "^17.0.2",
	"react-dom": "^17.0.2",
	"resolve-url-loader": "^5.0.0",
	"sass": "^1.51.0",
	"sass-loader": "^12.6.0",
	"ts-loader": "^9.2.9",
	"typescript": "^4.6.3"
```

prettier追加

```text
npm i -D prettier eslint-config-prettier
```

.eslintrc.jsに追記

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json" // TypeScriptのLint時に参照するconfigファイルを指定
  },
  plugins: ["react", "@typescript-eslint"],
  "ignorePatterns": [
    ".eslintrc.js"
  ],
  rules: {
    'no-use-before-define': "off",
    "@typescript-eslint/no-use-before-define": "off",
    'import/prefer-default-export': "off",
    'import/extensions': [
        'error',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.jsx', '.tsx'],
        },
      ],
      'react/react-in-jsx-scope': 'off',
      'no-void': [
        'error',
        {
          allowAsStatement: true,
        },
      ],
	  'import/no-extraneous-dependencies': ['error', {
			  devDependencies: true, // devDependenciesのimportを許可
			  optionalDependencies: false,
		}]
  },
  settings: {
    'import/resolver': {
        node: {
            paths: ['src'],
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        },
    },
  },
};
```

.prettierrc.js

```js
module.exports = {
    printWidth: 120,
    singleQuote: true,
    semi: false,
}
```

.eslintignore

```
build/
public/
**/node_modules/
*.config.js
.*lintrc.js
/*.*
```

package.json追記
```json
"fix": "npm run format && npm run lint:fix",
"format": "prettier --write 'resources/**/*.{js,jsx,ts,tsx}'",
"lint:fix": "eslint --fix 'resources/**/*.{js,jsx,ts,tsx}'"
```

husky lintstage

```
npm i -D husky lint-staged
npx husky-init && npm install
```

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged //編集
```

package.json
```
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx}": [
      "npm run fix"
    ]
  }
```
