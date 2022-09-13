## この記事に書いてあること
LaravelアプリケーションにSAML認証方式のSSO（シングルサインオン）を実装する

## 前提条件
Laravel側での認証機能が既に作成されていることが必須です。

## シングルサインオンとは？
1度のユーザー認証によって複数のシステム（業務アプリケーションやクラウドサービスなど）の利用が可能になる仕組みです

## SAML認証とは？
SAML（Security Assertion Markup Language）とは、SSO（シングルサインオン）環境を構築できるプロトコル（規約）のひとつです。
SSO環境を構築する方法として、有名なものにOAuth2.0認証やOpenID Connect認証などがあります。

認証方式による細かな違いは[他の技術記事](https://tech-blog.rakus.co.jp/entry/20210930/auth)などで確認してください。

また、SAML認証はOASISによって2002年に策定されたXMLベースの標準規格です。
現在の主流バージョンは2.0です。

## 実装するために使うライブラリ
SAML認証を実装するにはライブラリを使ってしまうのが簡単かつ安全です。

有名なライブラリにOneLoginが提供する[Open-Source SAML Toolkits](https://www.samltool.com/toolkits.php)があるのですが、今回はそれを基盤として作られている[Laravel-saml2](https://github.com/aacotroneo/laravel-saml2)を使います。

## インストール - Composer
```
composer require aacotroneo/laravel-saml2
```

Laravel5.5以下のバージョンの場合、サービスプロバイダを追加します。

```php:config/app.php
'providers' => [
        ...
    	Aacotroneo\Saml2\Saml2ServiceProvider::class,
]
```

## 設定ファイルの公開

下記コマンドで設定ファイルを作成します。
```
php artisan vendor:publish --provider="Aacotroneo\Saml2\Saml2ServiceProvider"
```

`config/saml2_settings.php`
`config/saml2/mytestidp1_idp_settings.php`

が追加されます。
後ほど、これらのファイルをカスタマイズしていきます。

## IdPにSPのメタ情報を登録
LaravelのSAMLメタ情報を確認し、IdP側に登録（登録方法や必要な情報は各サービスを確認）

ちなみに、ここまで新しいルーティング情報が追加されている。
メタ情報は下記ルーティングのうち`saml2/{idpName}/metadata`から確認可能です。
![saml.png](https://image.docbase.io/uploads/0a9e4e84-4a1d-4546-8671-b57bf7899702.png =WxH)

`{idpName}`の箇所は`config/saml2_settings.php`の10行目に設定されている値が入る。この値は自分で任意のものに変更可能。

```php:config/saml2_settings.php
<?php
return $settings = array(
    省略
    'idpNames' => ['test'],
    省略
```

つまり上記のように`test`となっている場合は、`saml2/test/metadata`にアクセスするとxml形式のメタ情報が取得できる。このメタ情報からentityIDやACSのURLなども確認できるが、デフォルト設定は以下の通り。

ACS の URL
`https://{laravel_url}/saml2/{idpName}/acs`

エンティティ ID]
`https://{laravel_url}/saml2/{idpName}/metadata`

## Laravel（SP）にIdPメタ情報を設定
ここらへんの設定は本家のOneLoginプロジェクトに由来するので、もしわからないことがあれば、[こちらのドキュメント](https://github.com/onelogin/php-saml)を参照する

各環境に合わせてentityId、singleSignOnService、singleLogoutService、x509certを指定します。
例として、GoogleをIdPとして利用した場合を紹介します。

IdPメタ情報は`config/saml2/〇〇_idp_settings.php`に設定していきます。

まず変数の値を変更。この変数が同ファイルの63行目以降で使われます。
```php:config/saml2/〇〇_idp_settings.php
<?php

//GOOGLEに変更
$this_idp_env_id = 'GOOGLE';
```

.envに実際のメタ情報を追加
※[stackoverflowの回答](https://stackoverflow.com/questions/51360680/how-to-configure-single-logout-when-using-google-apps-as-the-identity-provider)によると、GoogleはSLOをサポートしていないようなので、とりあえず`https://accounts.google.com/Logout`をデフォルト値として設定しています。

```text:.env
# SAML2 環境設定
SAML2_GOOGLE_IDP_ENTITYID=https://accounts.google.com/o/saml2?idpid=****
SAML2_GOOGLE_IDP_SSO_URL=https://accounts.google.com/o/saml2/idp?idpid=****
SAML2_GOOGLE_IDP_SL_URL=https://accounts.google.com/Logout
SAML2_GOOGLE_IDP_x509=****
```

先ほど、変数と.envで追加したメタ情報は`config/saml2/〇〇_idp_settings.php`の63行目以降で使われることになります。

```php:config/saml2/〇〇_idp_settings.php
    // Identity Provider Data that we want connect with our SP
    'idp' => array(
        // Identifier of the IdP entity  (must be a URI)
        'entityId' => env('SAML2_'.$this_idp_env_id.'_IDP_ENTITYID', $idp_host . '/saml2/idp/metadata.php'),
        // SSO endpoint info of the IdP. (Authentication Request protocol)
        'singleSignOnService' => array(
            // URL Target of the IdP where the SP will send the Authentication Request Message,
            // using HTTP-Redirect binding.
            'url' => env('SAML2_'.$this_idp_env_id.'_IDP_SSO_URL', $idp_host . '/saml2/idp/SSOService.php'),
        ),
        // SLO endpoint info of the IdP.
        'singleLogoutService' => array(
            // URL Location of the IdP where the SP will send the SLO Request,
            // using HTTP-Redirect binding.
            'url' => env('SAML2_'.$this_idp_env_id.'_IDP_SL_URL', $idp_host . '/saml2/idp/SingleLogoutService.php'),
        ),
        // Public x509 certificate of the IdP
        'x509cert' => env('SAML2_'.$this_idp_env_id.'_IDP_x509', '***'),
        /*
         *  Instead of use the whole x509cert you can use a fingerprint
         *  (openssl x509 -noout -fingerprint -in "idp.crt" to generate it)
         */
        // 'certFingerprint' => '',
    ),
```

## SAML認証のroutesMiddlewareを追加

Kernel.php に新規ミドルウェアグループsamlを追加
VerifyCsrfTokenを入れるとログインセッションが作られないとのことなので注意

```php:app\Http\Kernel.php
    protected $middlewareGroups = [
        'web' => [
            \App\Http\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            // \Illuminate\Session\Middleware\AuthenticateSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \App\Http\Middleware\VerifyCsrfToken::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],

        'api' => [
            // \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
            'throttle:api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],
         // samlグループを追加
        'saml' => [
            \App\Http\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],
    ];
```

`config\saml2_settings.php`にmiddlewareを反映させます。

```php:config\saml2_settings.php
    'routesMiddleware' => ['saml'],
```


## SAML認証とLaravelAuthの連携

`app/Providers/EventServiceProvider.php`のbootメソッドの中に、Samlログイン時のイベントリスナを登録します
こうすることで、SAMLログイン時にLaravelのAuthでもログインするようになります。

```php:app/Providers/EventServiceProvider.php
   public function boot()
    {
        parent::boot();

        //SAML2 のログインイベント
        Event::listen('Aacotroneo\Saml2\Events\Saml2LoginEvent', function (Saml2LoginEvent $event) {
            $messageId = $event->getSaml2Auth()->getLastMessageId();
            $user = $event->getSaml2User();

            // 属性からUserモデルを取得する
            $userData = [
                'id' => $user->getUserId(),
                'attributes' => $user->getAttributes(),
                'assertion' => $user->getRawSamlAssertion()
            ];
            $laravelUser = User::where('email',$userData['attributes']['emailAddress'])->first();

            if ($laravelUser) {
                Auth::login($laravelUser);
                return;
            } else {
                abort(401, 'Authorization Required');
                return;
            }
        });
    }
```

## ログイン画面の設置
ログイン先はライブラリで生成されたルートである
`https://{laravel_url}/saml2/{idpName}/login`
なので、ログインボタンのリンク先を変更する

```html:resources/views/welcome.blade.php
<div class="data-form">
    <div class="button-area">
        <a class="button size-l" href="/saml2/google/login">ログイン</a>
    </div>
</div>
```

以上