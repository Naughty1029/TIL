
ウェブサイトで希にお客様から、サーバのセキュリティ確認・および設定をして欲しいという事があります。
一番あるパターンは、サーバの脆弱性診断を実施した際に、設定が不足しているからなどの依頼があるパターンです。

以下に必要になりそうな設定をまとめておきます。

# Apache
## httpd.conf 及び conf.d/default.conf での設定
Apache の設定ファイルに記載する方法です。
サーバ全体で設定出来るため、こちらの方法が実施できる場合には、これがベターです。

```apacheconf:default.conf
ServerTokens Prod
ServerSignature Off
TraceEnable Off
FileETag None
RequestHeader unset Proxy

Header unset "X-Powered-By"
Header append X-Frame-Options SAMEORIGIN
Header set X-XSS-Protection "1; mode=block"
Header set X-Content-Type-Options nosniff

<Directory /var/www/html>
    AllowOverride All
    Options -Indexes
</Directory>
```

## .htaccess での設定
.htaccess で設定することが出来ます。
レンタルサーバや、1台のサーバで複数のドメインをホストしている、バーチャルドメインでサーバを構築し、個別のドメインに設定する際には、こちらの方法になります。
```apacheconf:.htaccess
Header always unset "X-Powered-By"
Header always append X-Frame-Options "SAMEORIGIN"
Header always set X-XSS-Protection "1; mode=block"
Header always set X-Content-Type-Options "nosniff"
```
# Nginx での設定
## conf.d/default.conf での設定
Nginx の設定ファイルに記載する方法です。
独自でサーバを立ち上げた場合、もしくは速度を優先して構築した際などにはこちらになります。
```nginxconf:default.conf
server_tokens off;
etag off;
autoindex off;
add_header X-Frame-Options SAMEORIGIN;
add_header X-XSS-Protection "1; mode=block";
add_header X-Content-Type-Options nosniff;
```

# PHP での設定
## php.ini での設定
```ini:php.ini
expose_php = Off
```

# それぞれの設定内容の解説
## 不要な設定や情報の抑制
### ServerTokens 非表示
**Apache サーバ設定ファイル**
```apacheconf:default.conf
ServerTokens Prod
```
HTTP レスポンスヘッダから 「Apache」の文字列のみを返します。

> ServerTokens Prod
> ServerTokens Minimal

- Prod［uctOnly］
「Server:Apache」と Apache であるということのみを表示

- Min［imal］
「Server:Apache/1.3.37」のように Apache のバージョンまでを表示

- OS
「Server:Apache/1.3.37(Unix)」のように Apache のバージョン情報に加え OS 情報まで表示

- Full（デフォルト）
「Server:Apache/1.3.37(Unix) PHP/4.3.9」のように Apache のバージョン、OS 情報に加え、モジュール情報を表示
**Nginx サーバ設定ファイル**
```nginxconf:default.conf
server_tokens off;
```
HTTP レスポンスヘッダから 「Apache」の文字列のみを返します。

> server_tokens off;
> server_tokens on;

- on（デフォルト）
「nginx/1.11.6 (Ubuntu)」のように Nginx のバージョン情報に加え OS 情報まで表示

- off
「Server: nginx」とNginxであるということのみを表示

- build
「nginx/1.11.6  build 」のように Nginx のバージョン情報に加え build 名まで表示


### ServerSignature 非表示
**Apache サーバ設定ファイル**
```apacheconf:default.conf
ServerSignature Off
```
Apache のデフォルトエラーページのフッタに表示される、サーバの情報を全て非常時にする
※ Nginx については、server_tokens を off にすると、エラーページなどに表示されるサーバ情報も非表示になる。

### TraceEnable 無効化
**Apache サーバ設定ファイル**
```apacheconf:default.conf
TraceEnable Off
```
クロスサイトトレーシングを無効にし、脆弱性があった場合に Basic 認証の ID や Password、Cookie 情報などを漏洩させることを防ぎます。

### ETag 非表示
**Apache サーバ設定ファイル**
```apacheconf:default.conf
FileETag None
```
**Nginx サーバ設定ファイル**
```nginxconf:default.conf
etag off;
```
Apache の場合、HTTP レスポンスヘッダで出力される ETag に inode 番号を追加してしまうため、ETag 情報を出力しないようにすることで inode 番号の漏洩を防ぎます。
2.4 系からは inode 番号を出力しないようになったそうです。
ETag そのものを非表示にして欲しいなどの要求がある場合、上記設定で None や off を設定します。

### HTTP_PROXY 無効化
**Apache サーバ設定ファイル**
```apacheconf:default.conf
RequestHeader unset Proxy
```
**Nginx サーバ設定ファイル**
```nginxconf:default.conf
fastcgi_param HTTP_PROXY "";
```
ブラウザからアクセスする際に URL として ”proxy:”ヘッダをつけるとサーバ側で HTTP_PROXY として認識される(ヘッダのproxyが大文字に変換され、HTTP_が付与される)
CGIアプリケーションはこの値をHTTPプロキシの値として認識し、例えばPHPは外部接続時にHTTP_PROXYを利用して通信する。
そのため、サーバから外部にHTTP通信時にプロキシを経由させることができる。
つまりは通信内容を傍受可能となります。
Apache で PHP をモジュールモードの場合には「RequestHeader unset Proxy」、fastCGI で動作する Apache や Nginx は後者で設定します。

### ディレクトリインデックス無効化
**Apache サーバ設定ファイル**
```apacheconf:httpd.conf
<Directory /var/www/html>
    Options -Indexes
</Directory>
```
**Apache .htaccess**
```apacheconf:.htaccess
Options -Indexes
```
**Nginx サーバ設定ファイル**
```nginxconf:default.conf
autoindex off;
```

### PHP バージョン非表示
**php サーバ設定ファイル**
```ini:php.ini
expose_php = Off
```
**Apache サーバ設定ファイル**
```apacheconf:httpd.conf
Header unset "X-Powered-By"
```
**Apache .htaccess**
```apacheconf:.htaccess
Header unset "X-Powered-By"
```
**Nginx サーバ設定ファイル**
```nginxconfig:default.conf
more_clear_headers X-Powered-By;
```
PHPのバージョン情報表示を非表示にします。
希に出力するレンタルサーバがある場合で、消したい場合には .htaccess で該当する header を unset することで対応が可能です。

## HTTP Response header へのセキュリティ設定

### Strict-Transport-Security
**Apache サーバ設定ファイル**
```apacheconf:default.conf
Header set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```
**Apache .htaccess**
```apacheconf:.htaccess
Header always set Strict-Transport-Security "max-age=31536000"
```
**Nginx サーバ設定ファイル**
```nginxconf:default.conf
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
```
ウェブサイトがブラウザーに HTTP の代わりに HTTPS を用いて通信を行うよう指示するためのものです。
HTTP でアクセスしてきても、自動的に HTTPS に変換されてアクセスすることになります。
> Strict-Transport-Security: max-age=\<expire-time\>
> Strict-Transport-Security: max-age=\<expire-time\>; includeSubDomains
> Strict-Transport-Security: max-age=\<expire-time\>; preload

-  max-age=\<expire-time\>
この設定が保持される秒数を定義

- includeSubDomains
サーバ設定ファイルで指定した場合には、サブドメインまでこの設定を含める

- preload
Strict-Transport-Security が設定されていることをブラウザが事前に知っていた場合、始めてアクセスするときからHTTPを使わずHTTPSで接続できる

<details>
<summary>個人的な感想</summary>
多分ほとんどのサイトが HTTPS への自動設定している昨今、ほぼ不要になって来ている設定かなと思います。
</details>

### X-XSS-Protection
**Apache サーバ設定ファイル**
```apacheconf:default.conf
Header set X-XSS-Protection "1; mode=block"
```
**Apache .htaccess**
```apacheconf:.htaccess
Header always set X-XSS-Protection "1; mode=block"
```
**Nginx サーバ設定ファイル**
```nginxconf:default.conf
add_header X-XSS-Protection "1; mode=block";
```
ブラウザがクロスサイトスクリプティング攻撃を検知した場合に、自動的に遮断などの動作をとれるようにする設定です。
> X-XSS-Protection: 0
> X-XSS-Protection: 1
> X-XSS-Protection: 1; mode=block
> X-XSS-Protection: 1; report=\<reporting-uri\>

-  0
XSS フィルタリングを無効化します。

- 1
XSS フィルタリングを有効化します (通常はブラウザーの既定値です)。クロスサイトスクリプティング攻撃を検知すると、ブラウザーはページをサニタイズします (安全でない部分を取り除きます)。

- 1; mode=block
XSS フィルタリングを有効化します。攻撃を検知すると、ページをサニタイジングするよりも、ページのレンダリングを停止します。

- 1; report=\<reporting-uri\> (Chromium only)
XSS フィルタリングを有効化します。クロスサイトスクリプティング攻撃を検知すると、ブラウザーはページをサニタイズし、攻撃レポートを作成します。レポートを送信するために、 CSP report-uri ディレクティブ機能を利用します。

### X-Content-Type-Options
**Apache サーバ設定ファイル**
```apacheconf:default.conf
Header set X-Content-Type-Options "nosniff"
```
**Apache .htaccess**
```apacheconf:.htaccess
Header always set X-Content-Type-Options "nosniff"
```
**Nginx サーバ設定ファイル**
```nginxconf:default.conf
add_header X-Content-Type-Options "nosniff"
```
ブラウザが自動的にファイルタイプを判別して挙動を振る舞う事があるのですが、これをサーバが送る MIME タイプの動き方に制限することが出来ます。
例えばファイルは CSS ファイルだったりするのですが、中身が実は JS で意図せずこのファイルを読ませることで、攻撃を行う事を防ぐことが可能になります。

> X-Content-Type-Options "nosniff"

- nosniff<br>
レスポンスの Content-Type にブラウザの挙動を一致させ、想定外の動作を防ぎます。

### X-Frame-Options
**Apache サーバ設定ファイル**
```apacheconf:default.conf
Header append X-Frame-Options "SAMEORIGIN"
```
**Apache .htaccess**
```apacheconf:.htaccess
Header always append X-Frame-Options "SAMEORIGIN"
```
**Nginx サーバ設定ファイル**
```nginxconf:default.conf
add_header X-Frame-Options "SAMEORIGIN"
```
ブラウザーがページを \<frame\>、\<iframe\>、\<embed\>、\<object\> の中に表示することを許可するかどうかを示すために使用します。サイトはコンテンツが他のサイトに埋め込まれないよう保証することで、クリックジャッキング攻撃を防ぐために使用することができます。
>X-Frame-Options: DENY
>X-Frame-Options: SAMEORIGIN

- DENY
ページをフレーム内に表示することは、それを試みているサイトが自ドメイン内だとしても拒否します。

- SAMEORIGIN
自ドメイン内でのみ表示を許可します。ブラウザ側の実装により多少範囲が異なる場合があります。

- **ALLOW-FROM \<uri\>**
**廃止されました。** 使用しないで下さい。
指定の URI でのみ読み込まれるという機能でした。希にこの設定が可能と記述しているサイトがありますのでご注意下さい。

### X-Permitted-Cross-Domain-Policies
**Apache サーバ設定ファイル**
```apacheconf:default.conf
Header set X-Permitted-Cross-Domain-Policies "none"
```
**Apache .htaccess**
```apacheconf:.htaccess
Header always set X-Permitted-Cross-Domain-Policies "none"
```
**Nginx サーバ設定ファイル**
```nginxconf:default.conf
add_header X-Permitted-Cross-Domain-Policies "none"
```

クロスドメインポリシーファイル (crossdomain.xml) を許可するかどうかを指定します。
必要とする技術は、Adobe Flash Player、Adobe Acrobat、Microsoft Silverlight、Apache Flex なので、基本 none 設定で問題ありません。

>X-Permitted-Cross-Domain-Policies "none"

- none
クロスドメインポリシーファイル (crossdomain.xml) を許可しません。

### Referrer-Policy
**Apache サーバ設定ファイル**
```apacheconf:default.conf
Header set Referrer-Policy "strict-origin-when-cross-origin"
```
**Apache .htaccess**
```apacheconf:.htaccess
Header always set Referrer-Policy "strict-origin-when-cross-origin"
```
**Nginx サーバ設定ファイル**
```nginxconf:default.conf
add_header Referrer-Policy "strict-origin-when-cross-origin"
```

リファラー情報を渡す範囲を指定できます。

> Referrer-Policy: no-referrer
> Referrer-Policy: no-referrer-when-downgrade
> Referrer-Policy: origin
> Referrer-Policy: origin-when-cross-origin
> Referrer-Policy: same-origin
> Referrer-Policy: strict-origin
> Referrer-Policy: strict-origin-when-cross-origin
> Referrer-Policy: unsafe-url

- no-referrer
Referer ヘッダーが省略されます。送信されるリクエストにはリファラー情報が含まれません。

- no-referrer-when-downgrade
同一プロトコル水準か向上する場合 ( HTTP→HTTP, HTTP→HTTPS, HTTPS→HTTPS ) は、リジン、パス、クエリー文字列が Referer ヘッダーで送信されます。セキュリティ水準が低下するリクエスト ( HTTPS→HTTP, HTTPS→file ) では Referer ヘッダーが送信されません。

- origin
オリジンのみが Referer ヘッダーで送信されます。
たとえば、 https://example.com/page.html にある文書からは、 https://example.com/ というリファラーが送信されます。

- origin-when-cross-origin
同一のプロトコル水準 ( HTTP→HTTP, HTTPS→HTTPS ) で同一オリジン（ドメイン）のリクエストを行う場合はオリジン、パス、クエリー文字列を送信します。オリジン間リクエストや安全性の低下する移動先 ( HTTPS→HTTP ) ではオリジン（ドメイン）のみを送信します。

- same-origin
同一オリジンのリクエストではオリジン、パス、クエリー文字列を送信します。オリジン間リクエストでは Referer ヘッダーを送信しません。

- strict-origin
プロトコルのセキュリティ水準が同じである場合 (HTTPS→HTTPS) にのみオリジンを送信します。安全性の低下する移動先 (HTTPS→HTTP) には Referer ヘッダーを送信しません。

- strict-origin-when-cross-origin ( 規定 )
同一オリジンのリクエストを行う際はオリジン、パス、クエリー文字列を送信します。オリジン間リクエストでは、プロトコルのセキュリティ水準が同じである場合 ( HTTPS→HTTPS ) にのみオリジンを送信します。安全性の低下する移動先 ( HTTPS→HTTP ) には Referer ヘッダーを送信しません。

- unsafe-url
セキュリティに関係なく、どのリクエストを行った場合でも、オリジン、パス、クエリー文字列を送信します。
設定しちゃ駄目なやつです。

<details>
<summary>個人的な感想</summary>
strict-origin-when-cross-origin が規定値なので、指定しなくても良いかな？とも思うのですが、入れておかないと怒られる場合もあるので。
</details>


### Content-Security-Policy
```apacheconf:default.conf
Header set Content-Security-Policy: default-src 'self'
```
```apacheconf:.htaccess
Header always set Content-Security-Policy: default-src 'self'
```
```nginxconf:default.conf
add_header Content-Security-Policy: default-src 'self'
```

ページにブラウザが読み込みを許可されたリソースを管理できるようにします。いくつかの例外を除いて、大半のポリシーにはサーバーオリジンとスクリプトエンドポイントの指定を含んでいます。これはクロスサイトスクリプティング攻撃 (クロスサイトスクリプティング) を防ぐのに役立ちます。

許可したいものを記述していく、ホワイトリスト型になります。
'self' を指定した場合には、自ドメインを指します。ワイルドカードの * を指定した場合には、全てのドメインを許可します。
ディレクティブごとに許可したいドメインをスペースで区切って記述し、; でディレクティブを区切ります。

非常にディレクティブが多いため、一部よく使われる・重要なもののみ記載します。
> Content-Security-Policy: default-src 'self'
> Content-Security-Policy: script-src 'self' \*.google.com 
> Content-Security-Policy: default-src 'self'; image-src *; style-src \*.google.com; script-src \*.google.com

- default-src
指定された以外の読み込み元を設定します。

- script-src
JavaScript の読み込み元を制限します。これにより指定されていないサイトからの JavaScript の実行が制限されるため、攻撃などの大半を防ぐことが可能になります。
Google Tag Manager を使うと、JavaScript からさらに外部の JavaScript を読み込む形になるので、注意が必要です。

- image-src
画像の読み込み元を制限します。
これを指定する際は、ほぼワイルドカードでの指定になると思います。

- style-src
スタイルシートの読み込み元を制限します。
アイコンなどの外部から読み込みしているような際に注意が必要です。

- font-src
Web フォントの読み込み元を制限します。
スタイルシートで指定した \@font-face によって読み込まれるフォントのための有効なドメインを指定します。

- media-src
\<audio\>、\<video\>、\<track\> タグで読み込まれる要素のソースとなるドメインを指定します。

- object-src
\<object\>、 \<embed\>、\<applet\> タグで読み込まれる要素のソースとなるドメインを指定します。

- frame-src
\<frame\>、\<iframe\> タグで読み込まれる要素のソースとなるドメインを指定します。

- upgrade-insecure-requests
HTTPS ではなく HTTP で接続しに行く設定の場合、自動的に HTTPS に読み替えてアクセスしに行くようになります。
これは HTTP でサーバにアクセスしてからリダイレクトで HTTPS になるのではなく、ブラウザが先に HTTP から HTTPS に読み替えてアクセスしに行く形になります。
```
<img src="http://example.com/image.png">
```
は
```
<img src="https://example.com/image.png">
```
と読み替えられてアクセスすることになります。


#### CSS および Script のインラインコードについて
SCP により style-src、script-src を指定した場合には、インラインで記載されている \<style\> タグや  \<script\> タグでの HTML 内に直接記述したコードは無効化されてしまいます。
これは不正な攻撃を防ぐことを目的とした、このコードでは仕方ない部分ではありますが、GTM などについてはインラインでコードを記述する事が必要とされる場面があります。
そのような場合に CSP と共存するような場合には、 nonce という指定をします。

> Content-Security-Policy: script-src 'self' \*.google.com 'nonce-\<SERVER-GENERATED-CODE\>'

この \<SERVER-GENERATED-CODE\> についてはランダムで毎回異なる値を出力する必要があるため、サイト側で動的にページを出力する仕組みと、このページを出力する際には、ヘッダー情報にこの値を送信しなければなりません。
そのため、CSP の出力については、サーバ側だけのコントロールではなく、プログラム側でもコントロールする必要があり、正直かなり難易度が上がります。

```php:example.php
<?php
$scp_str = "script-src 'self' *.google.com 'nonce-##nonce##'";
$nonce = hash('md5', openssl_random_pseudo_bytes(128));
$scp_str = preg_replace('/##nonce##/u', $nonce, $scp_str);
header('Content-Security-Policy: ' . $scp_str);
?>
<!-- Google Tag Manager -->
<script nonce=<?php echo $nonce; ?>>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;var n=d.querySelector('[nonce]');
n&&j.setAttribute('nonce',n.nonce||n.getAttribute('nonce'));f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-{YOUR-CONTAINER-ID}');</script>
<!-- End Google Tag Manager -->
```

また、インラインでここまで制限されるため、昔ながらの onclick で特定の関数を呼び出すような書き方については、全て使用できなくなります。

#### セキュリティを無視してインラインコードを実装したいとき
推奨されていないやり方ですが、どうしても実装したい場合には unsafe-inline を使用することで、インライン実装を行う事が可能です。

> Content-Security-Policy: script-src 'self' \*.google.com 'unsafe-inline'


#### CSP の設定について
非常に多数のディレクティブが存在し、かつ細かく設定出来ることからサイトの運用途中で入れ込むことはかなり難しい設定になります。
そのため、要件の初期段階で細かく検討する必要があります。

#### CSP のバッドノウハウ
とは言っても途中でどうしても入れたいといわれた場合には、何らかの対処を行う必要があります。
何でも良いから取りあえず指定されていれば・・・という状態で対処を考えた場合には、
```
Header set Content-Security-Policy: default-src *
```
というように、ほぼ無意味な記述を行うか、
```
Header set Content-Security-Policy: upgrade-insecure-requests
```
制定でもすべてのアクセスを HTTPS で安全に事前に処理する形での記述が限界かなと思います。

<details>
<summary>個人的な感想</summary>
真面目な話、大手のサイトほどマーケティング用のコードなどが多いため、驚くほど多くのサイトへ外部アクセスをしています。
そのため、この設定につてはインラインを許可する nonce を動的に全てのページで実行出来るようにしつつ、ヘッダー情報を出力しつつという形になるので、かなり面倒な処理になります。
</details>

### Expect-CT
**Apache サーバ設定ファイル**
```apacheconf:default.conf
Header set Expect-CT: max-age=86400
```
**Apache .htaccess**
```apacheconf:.htaccess
Header always set Expect-CT: max-age=86400
```
**Nginx サーバ設定ファイル**
```nginxconf:default.conf
add_header Expect-CT: max-age=86400
```
不正なサーバ証明書を検知する仕組みです。

> Expect-CT: max-age=86400

- max-age<br>
サーバ証明書の透明性チェックを24時間強制します。

### Permissions-Policy
**Apache サーバ設定ファイル**
```apacheconf:default.conf
Header set Permissions-Policy: geolocation=(self), camera=(self "https://youteube.com")
```
**Apache .htaccess**
```apacheconf:.htaccess
Header always set Permissions-Policy: geolocation=(self), camera=(self "https://youteube.com")
```
**Nginx サーバ設定ファイル**
```nginxconf:default.conf
add_header Permissions-Policy: geolocation=(self), camera=(self "https://youteube.com")
```
Feature Policy から改名されました。
場合によっては同じ値を並列で記載した方が良いかもしれません。

JavaScript などを利用して、ブラウザからいろいろな機器類を操作できるようになっていますが、これらを抑制することが可能になります。
ただ、正直現時点ではあまり制御する事が無いと思いますので、念のため入れるくらいのイメージです。
ただ、カメラや位置情報など、非常にプライバシー製の高い情報へのアクセスを制御出来ることから、万が一そのような情報へアクセス出来るような問題が発生してしまった場合でも、外部サイトへ情報を出さないように制御出来るため、覚えておくと良いと思います。
これらはいずれも初期値は self です。空にすることで全て拒否できるはずです。

非常にディレクティブが多いため、一部よく使われる・重要なもののみ記載します。

> Permissions-Policy: geolocation=('self' https://google.com), camera=(self "https://youteube.com")
> Permissions-Policy: geolocation=()
> Permissions-Policy: camera=()


- geolocation
Geolocation API へのアクセスを制御します。
現在地を取得する機能などを使用する際に、外部のサービスを呼び出して使うような場合にコントロールする必要がある際に設定します。
Google Mapをサイト内に埋め込み、現在地に応じて処理する場合などで、制御しているような場合にはこのディレクティブで許可する形になります。

- camera
動画入力用のインターフェースへのアクセスを制御します。
サイト内部で外部サイトの動画配信機能などを埋め込んでいるような場合で、制御しているような場合に使用します。
Youtube などの配信サービスをサイト内に埋め込み、そこから直接配信するような仕組みを設けているような場合で、制御しているような場合にはこのディレクティブで許可する形になります。


# WordPress で特定のヘッダーを出力したいとき
通常のテンプレート上では、すでにヘッダー情報が出力されているため、エラーになってしまいます。
また、CSP の nonce をどうしても出力したような場合には、事前に自分で出力する必要があるので、functions.php などで調整しましょう。
管理画面で正直 CSP の nonce 制御は無理なので、除外しましょう。

```php:functions.php
add_action( 'send_headers', function() {
    if ( ! is_admin() ) {
		    header( 'Strict-Transport-Security: max-age=31536000; includeSubDomains; preload' );
	}
} );
```


# 参照サイト
https://httpd.apache.org/docs/current/ja/mod/core.html
https://qiita.com/hideji2/items/1421f9bff2a97a5e5794
https://qiita.com/bezeklik/items/1c4145652661cf5b2271
https://qiita.com/y-araki-qiita/items/2dd3bcffe80932437e7e
https://securityheaders.com/
https://www.ssllabs.com/ssltest/
https://rakko.tools/tools/26/
https://observatory.mozilla.org/
https://qiita.com/ariaki/items/78ed2d3810ad17f72398
その他いっぱい

## HTTP Response Header 確認サイト
https://blog.mothule.com/web/nginx/web-nginx-getting-started-security-on-mac
https://developers.google.com/tag-manager/web/csp?hl=ja