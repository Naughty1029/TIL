HerokuでPHPのアプリを動かそうと思った時に、デフォで使えるPHP拡張もあれば、使えないPHP拡張もあります。

デフォで使えないPHP拡張はcomposerを使って入れる必要があります。

こんな感じで`composer.json`に入れたい拡張を入れます。この時単に`"gd":"*"`とするとうまく行かないようです。

```php
"ext-exif":"*",
"ext-gd": "*"
```

次に、composer updateを実行。

```
composer update
```

あとは、コミットしてHerokuにプッシュしたらHerokuが自動でインストールしてくれるようです。

Herokuにデフォで入っているPHP拡張、入ってない拡張、サードパーティの拡張のリストはこちら。
[https://devcenter.heroku.com/articles/php-support#extensions](https://devcenter.heroku.com/articles/php-support#extensions)

設定方法はこちら

**Heroku PHP Support | Heroku Dev Center**
**[https://devcenter.heroku.com](https://devcenter.heroku.com/articles/php-support#using-optional-extensions)**
