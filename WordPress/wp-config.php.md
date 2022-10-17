WordPress がサーバの DB へアクセスする、User ID や Password などが保存される、非常に重要なファイルであることと、多くの設定をすることになるファイルです。

## WP_DEBUG
```php
define('WP_DEBUG', false);
define('WP_DEBUG_DISPLAY', false);
define('WP_DEBUG_LOG', false);
```
エラーデバッグ設定です。
WP_DEBUG でデバッグのハンドルを行うかです。
false を設定した場合、下の2つは true にしても無視されます。

WP_DEBUG_DISPLAY でエラーが出た際に画面上に表示されます。true に設定するのは開発環境のみになるかと思います。
ダイレクトにエラーメッセージが表示されるため、本番環境では必ず false になっているかを確認するようにして下さい。

WP_DEBUG_LOG でエラーログをサーバに保存するようにします。
位置は 
```sh
/wp-content/debug.log
```
となりますが、固定のためこれを攻撃材料の一つとして使われる場合があるので、本番環境で使用したい際には外部からのアクセスを遮断するように設定しましょう。攻撃のヒントになってしまいます。
また、ログを出力し続ける関係上、ログが肥大化して容量を圧迫するので、使用する際には定期的にサイズを確認し削除するなど、適切に処理するようにしましょう。

## MEMORY_LIMIT
```php
define('WP_MEMORY_LIMIT', '64M');
```
あまり問題になることはありませんが、WordPress が使用できるメモリーの制限値を変更出来ます。
デフォルト値はシングルサイトの場合には 40MB、マルチサイトの場合には 64MB となっています。
画像などを大量にアップした際などで、メモリ不足が原因でエラーになった際などで、こちらで対処することが可能です。
PHP 側の環境設定で、memory_limit が設定されている場合で memory_limit の値が WP_MEMORY_LIMIT より大きい場合には、memory_limit の値が優先されるとのことです。

## DISABLE_WP_CRON
```php
define('DISABLE_WP_CRON', true);
```
WordPress 本体で定時実行の処理については、WprdPress の各ページへのアクセスが発生した際に、wp-cron.php が実行されることで指定時間での記事公開や、自動実行などの処理が行われます。
しかしながら、アクセス毎にこの処理が発生するとアクセス数が多いサイトなどでは、この処理が非常に重くなりサイト全体の速度低下を引き起こします。
また、擬似的な自動実行のため、その時間以降に初めてアクセスがあった際に実行されるため、実行時間の信頼性も低いものがあります。
以上のことから、WordPress 本体が実行する疑似 cron の仕組みを殺すことが多くなります。
ただ、自動実行は行いたいので、OS 側の自動実行 ( cronなど ) で wp-cron.php へのアクセスを発生させて、運用する形が多くなります。
cron を設定出来ないようなサーバでも、別のサーバから curl などで wp-cron.php を呼び出すことで対処することも可能です。
ただし、負荷が上がるプログラムではあるので、 DDoS などの攻撃に利用されることがありますので、 wp-cron.php へのアクセス制限を行った方が良いファイルになります。

自サーバ / 他サーバから実行する方法（ アクセス制限をしている場合には、アクセス許可設定をすること ）
curl で実行
```sh:wp-cron.sh
curl https://example.com/wordpress/wp-cron.php &> /dev/null
```
apache ユーザーから PHP を直接起動して実行
```sh:wp-cron.sh
sudo -u apache /usr/bin/php -q /var/www/html/wordpress/wp-cron.php >/dev/null 2>&1
```
WP-CLI で実行
```sh:wp-cron.sh
sudo -u apache /usr/local/bin/wp cron event run --due-now --path=/var/www/html/wordpress/
```
シェルプログラムなので、実行権を付与
```sh
$ chmod +x wp-cron.sh
```
cron へ登録
```
* * * * * /home/hoge/wp-cron.sh
```
パスについては適時確認して下さい。

## FORCE_SSL_ADMIN
```php
define('FORCE_SSL_ADMIN', true);
if (strpos($_SERVER['HTTP_X_FORWARDED_PROTO'], 'https') !== false) {
    $_SERVER['HTTPS'] = 'on';
}
```
最近はほぼすべてのサイトが SSL 化されているため、改めて設定することは多くないのですが、CDN や NGINX を使用したリバースプロキシなど（以下キャッシュサーバ）で、WordPress が動作しているオリジンサーバが実は HTTP で動作していることなどがあります。
そのような場合だと、内部的に HTTP になっていると判定して、HTTPS へリダイレクトループを起こす場合があります。
そのような場合、上記の設定をセットでやる必要があります。
まず、FORCE_SSL_ADMIN で管理画面へのアクセスはすべて SSL で行う事という設定を実施します。
その上で、サーバーヘッダーの HTTP_X_FORWARDED_PROTO など、ドメインとしてアクセスしてきた際に、最初にアクセスされるキャッシュサーバへのアクセスが、HTTPS であったかどうか？を別途設定されているヘッダを確認する事で判定します。

WordPress は自身へのアクセスが HTTP か HTTPS かはサーバヘッダの HTTPS 変数を基準に判定します。
キャッシュサーバとオリジンサーバの間は HTTP で設定されていることが多いため、HTTP でオリジンサーバとの通信を実施している環境では、サーバ変数の HTTPS 変数については off が設定されます。
このままだと、見た目上 HTTPS でアクセスしているにもかかわらず、キャッシュサーバとオリジンサーバ間のアクセスが HTTP のため HTTP でのアクセスと判定されるため、無限ループを引き起こしてしまいます。
これを回避するために、上記のキャッシュサーバへのアクセスが HTTPS で合った場合に、サーバ変数の HTTPS の値を強制的に ON で上書きするコードと一緒に使用することになります。

HTTP_X_FORWARDED_PROTO については、キャッシュサーバの仕様によっては X-Forwarded-Proto など、変数が異なることがあるので、キャッシュサーバの仕様をよく確認しましょう。

## SCRIPT_DEBUG
```php
define('SCRIPT_DEBUG', true);
```
WordPress が内部で呼び出す、CSS や JS を縮小版 ( jquery.min.js ) でなくフルコード ( jquery.js ) を呼び出すことになるそうです。
デバッグなどの時には便利になると思いますが、ぶっちゃけ使うこと無いと思います。

## SAVEQUERIES
```php
define( 'SAVEQUERIES', true );
```
内部で使用される SQL クエリを保存しておいてくれます、
値はグローバル変数の 
```php
$wpdb->queries 
```
へ保存されているため、デバッグなどで任意のデータがとれてこないときなどにクエリ部分のデバッグに役立ちますが、パフォーマンス的には非常に重くなってしまうため、開発環境やバグがどうにも解消できなく調査する時のみに使用するようにして下さい。

## wp-config.php の開発環境切り替えミスを防ぐベストプラクティスになると良いな

```php
$host_name = $_SERVER["HTTP_HOST"];   // dev.example.com | test.example.com | www.example.com | example.com

// ドメイン名に dev|test が含まれているかで開発環境かを判定
$flag = preg_match('/^(dev|test)/', $host_name ) ? true : false;

define( 'WP_DEBUG', $flag );
define( 'WP_DEBUG_DISPLAY', false ); // 元々無効にしたいものについては、false を設定
define( 'WP_DEBUG_LOG', $flag );
define( 'SCRIPT_DEBUG', false );
define( 'SAVEQUERIES', $flag );

define('WP_MEMORY_LIMIT', '64M');
define('FORCE_SSL_ADMIN', true);
// サーバ変数 HTTP_X_FORWARDED_PROTO については、サーバ環境によっては参照する変数名が異なるので注意
if (strpos($_SERVER['HTTP_X_FORWARDED_PROTO'], 'https') !== false) {
  $_SERVER['HTTPS'] = 'on';
}
```
