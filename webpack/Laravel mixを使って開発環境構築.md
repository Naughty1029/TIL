**webpack.mix.js**

```jsx
const mix = require('laravel-mix');

mix.setResourceRoot('docs');
mix.webpackConfig({ devtool: "source-map" });

mix.browserSync({
    server: {
      baseDir: 'docs',
      index: 'index.html'
    },
    port: 8081,
    proxy: false,
    files: '**/*'
});

mix
  .js('src/js/script.js','docs/assets/js')
  .autoload({
    jquery: ['$', 'window.jQuery']
  })
  .sourceMaps();

mix
  .sass('src/scss/style.scss', 'docs/assets/css/')
  .sourceMaps()
  .options({
    processCssUrls: false,
    autoprefixer: {
      options: {
        grid: true,
      }
    },
    postCss: [
      require('css-mqpacker')(),
      require('css-declaration-sorter')({
        order: 'smacss' // smacss, concentric-css
      }),
      require('postcss-custom-properties')({
        preserve: false
    })
    ]
});
```

**package.json**

```json
{
  "name": "template",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {},
  "keywords": [],
  "author": "",
  "license": "ISC",
  "browserslist": [
    "last 1 versions",
    "IE 11",
    "Android >= 6"
  ],
  "devDependencies": {
    "browser-sync": "^2.26.14",
    "browser-sync-webpack-plugin": "^2.3.0",
    "cross-env": "^7.0.3",
    "css-declaration-sorter": "^6.0.2",
    "css-mqpacker": "^7.0.0",
    "laravel-mix": "^6.0.16",
    "postcss": "^8.2.9",
    "postcss-custom-properties": "^11.0.0",
    "resolve-url-loader": "^3.1.2",
    "sass": "^1.32.8",
    "sass-loader": "^11.0.1"
  },
  "dependencies": {
    "jquery": "^3.6.0"
  }
}
```

**commad**

```
nodebrew use v12.14.0  //nodeバージョンによっては動かない
npm run dev
npm run watch
npx mix
```

## 参考記事
- [【簡単】laravel-mixを使って爆速マークアップ環境を構築する方法【laravel外で使う】](https://flex-box.net/laravel-mix/)
- [Laravel Mixを使って簡単にフロントエンド開発環境を構築する方法](https://www.willstyle.co.jp/blog/1836/)
