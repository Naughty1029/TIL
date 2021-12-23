# What Today I Learned...
Building a front-end development environment.
<br>
<br>
## Build `package.json`  
```
npm init -y
```

## Install webpack locally  
```
npm install -D webpack webpack-cli
```

## Run webpack
bundle `src/index.js` to `dist/main.js` automatically.

```
npx webpack --mode development
```
※if the 'mode' option has not been set,webpack will fallback to 'production' for this value.

or

add scripts to package.json
```
"scripts": {
  "dev": "webpack --mode development",
  "build": "webpack --mode production"
}
```
and run the npm command.
```
npm run dev //for development
npm run build //for production
```

## Create a Webpack Config File
  
```javascript
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

Change default entry point like this.
```
root/
 └ src
 　   └ index.js
 ↓ 
root/
 └ src/
　   　└ app.js
```

move index.html to dist-folder,now your directory like this.
```
root/
 ├ dist/
 │   ├ bundle.js
 │   └ index.html
 ├ node_modules
 ├ src/
 │  └ app.js
 ├ package.lock.json
 ├ package.json
 └ webpack.config.js
```

## Development Server

Install webpack-dev-server
```
npm install -D webpack-dev-server
```

add script to `webpack.config.js` for webpack-dev-server

```javascript
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        port: 9000,
        open: true
    },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
};
```

add scripts to package.json
```
"scripts": {
  "start": "webpack-dev-server"
}
```

※ I got an below err when implement npm run start 
```
static heartbeat interval = 1000;
```
Err reason  
node version is too low  
because webpack dev server v4 0.0 + node >= v12.13.0, webpack >= v4.37.0

## split up webpack.config.js into two separate files

**Development Webpack Config**

```javascript
const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/app.js',
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        port: 9000,
        open: true
    },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
};
```

**Production Webpack Config** 
```javascript
const path = require('path');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: './src/app.js',
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        port: 9000,
        open: true
    },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
};
```



rewrite Production and Development NPM Scripts
```
"scripts": {
  "build": "webpack --config=webpack.prod.js",
  "dev": "webpack --config=webpack.dev.js",
  "start": "webpack-dev-server --config=webpack.dev.js --open"
},
```

merge webpack file

```
npm i -D webpack-merge
```

create webpack.common.js
```javascript
const path = require('path');

module.exports = {
    entry: './src/app.js',
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        port: 9000,
        open: true
    },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
};
```

fix webpack.dev,js
```javascript
const path = require('path')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')

module.exports = merge(commonConfig,{
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        port: 9000,
        open: true
    },
});
```

fix webpack.prod,js
```javascript
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')

module.exports = merge(commonConfig,{
    mode: 'production',
    devtool: 'source-map',
});
```

## SassLoader
To use Scss,install style-loader,css-loader,sass,sass-loader
```
npm i -D style-loader css-loader sass sass-loader
```

add them to webpack.common.js

```javascript
const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader","css-loader","sass-loader",]
            }
        ]
    }
};
```


## BabelLoader
Babel is a JavaScript compiler that can turn ES6+ code into ES5 code.

```
npm install --save-dev babel-loader @babel/core
```

```javascript
{
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
```
```
npm install @babel/preset-env --save-dev
```
```json
{
  "presets": ["@babel/preset-env"]
}
```

## MiniCssExtractPlugin
install the plugin
```
npm i -D mini-css-extract-plugin
```

add new mini-css-extract-plugin to webpack.common.js

```javascript
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader : MiniCssExtractPlugin.loader,
                    },
                    {
                        loader : 'css-loader',
                        options : { url : false }
                    },
                    {
                        loader : 'sass-loader',
                    }
                ]
            },
        ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
    ]
};
```

## Minifying CSS
install
```
npm install -D css-minimizer-webpack-plugin
```

code this.
```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
};
```
The compression settings will be overridden, so you will need to use a compression plugin for js.

## TerserWebpackPlugin
To begin, you'll need to install terser-webpack-plugin:
```
npm install -D terser-webpack-plugin
```

Then add the plugin to your webpack config. 

```javascript
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  optimization: {
      minimizer: [
          new CssMinimizerPlugin(),
          new TerserPlugin()
      ],
  },
};
```

## Reference Links
I learned from the following links. Thank you very much.
- https://webpack.js.org/configuration/dev-server/
- [How to Create a Production-Ready Webpack 4 Config From Scratch](https://www.freecodecamp.org/news/creating-a-production-ready-webpack-4-config-from-scratch/)
- [webpackのインストールと使い方](https://qiita.com/tokasuk/items/d53d36edfe8ea82231af)
- [webpack 4 入門](https://qiita.com/soarflat/items/28bf799f7e0335b68186)
- [最新版で学ぶwebpack 5入門 JavaScriptのモジュールバンドラ](https://ics.media/entry/12140/)
- [webpackのproductionモードで自動minyfyされなかった](https://qiita.com/Sotq_17/items/27a167302096a810d1ec)

エラー解決
[Solved] Webpack error static heartbeat interval = 1000
https://programmerah.com/webpack-error-static-heartbeat-interval-1000-45939/

