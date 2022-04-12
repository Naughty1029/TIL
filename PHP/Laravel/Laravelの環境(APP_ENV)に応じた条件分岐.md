Laravel案件を担当すると、ローカル環境・テスト環境・本番環境で処理を変えたい場合に直面する。<br>
例えば、ローカルでSeedingするときは、ローカル用のcsvファイルを読み込みたいが、本番環境では本番用のcsvファイルを読み込みたいときなど。<br>
csvファイルを変えるということもできるが、手間がかかるので、プログラムを組んでおいて、環境に応じて、読み込みファイルを変更するようにする。

## .envファイルの修正
APP_ENVの値で現在の環境を判断することができる。
Laravelでは下記のように値が決まっている。

```:.env
//ローカル環境
APP_ENV=local

//本番環境
APP_ENV=production

//テスト環境
APP_ENV=testing
```

これら3つの定義は`vendor/laravel/framework/src/Illuminate/Foundation/Application.php`に記載がある。

```php
 /**
 * Determine if the application is in the local environment.
 *
 * @return bool
 */
public function isLocal()
{
    return $this['env'] === 'local';
}

/**
 * Determine if the application is in the production environment.
 *
 * @return bool
 */
public function isProduction()
{
    return $this['env'] === 'production';
}


/**
 * Determine if the application is running unit tests.
 *
 * @return bool
 */
public function runningUnitTests()
{
    return $this['env'] === 'testing';
}
```

## 環境に応じた条件分岐


```php
if (app()->isProduction()) {
    // 本番環境の場合の処理
}

if (app()->isLocal()) {
    // ローカル環境の場合の処理
}

if (app()->runningUnitTests()) {
    // テスト環境かどうかを判断する場合
}
```

[ドキュメントはここ]（https://laravel.com/api/6.x/Illuminate/Foundation/Application.html）
