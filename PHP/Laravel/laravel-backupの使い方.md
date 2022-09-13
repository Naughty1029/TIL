## この記事に書いてあること
Laravel案件でバックアップを定期的にとっておきたい。
ライブラリを使う方法のメモ。

## 使用ライブラリ
spatie / laravel-backup
- [github](https://github.com/spatie/laravel-backup/tree/main) 
- [document](https://spatie.be/docs/laravel-backup/v8/introduction)

## ライブラリの主な特徴
- データベースやファイルのバックアップ生成
- バックアップはzipにして保存してくれる
- クリーンアップ設定可能
- メール通知機能あり

## 使用方法
### composer インストール

バージョンによって、PHPやLaravelの指定が異なるので注意
```
composer require "spatie/laravel-backup:6.*"
```

### 設定ファイル`config/backup.php`生成

```
php artisan vendor:publish --provider="Spatie\Backup\BackupServiceProvider"
```

### 設定ファイルを編集

config/backup.php
```php
'source' => [

    'files' => [
    //バックアップを取りたいファイルを設定
        'include' => [
            base_path(),//特定のフォルダだけに変更することも可能
            // base_path(/storage/app) みたいな感じで
        ],
    ],
    
    //**--省略--**//
    
    //バックアップの出力先設定
    'destination' => [
    　'disks' => [
        　'local',// config/filesystems.phpに対応している
    　],
],

    //**--省略--**//
    
//メール通知設定
'mail' => [
    'to' => 'your@example.com',

    'from' => [
        'address' => env('MAIL_FROM_ADDRESS', 'hello@example.com'),
        'name' => env('MAIL_FROM_NAME', 'Example'),
    ],
],


    //**--省略--**//
    
//クリーンアップ設定

'cleanup' => [
    'strategy' => \Spatie\Backup\Tasks\Cleanup\Strategies\DefaultStrategy::class,

    'default_strategy' => [
        'keep_all_backups_for_days' => 7,

        'keep_daily_backups_for_days' => 16,

        'keep_weekly_backups_for_weeks' => 8,

        'keep_monthly_backups_for_months' => 4,

        'keep_yearly_backups_for_years' => 2,

        'delete_oldest_backups_when_using_more_megabytes_than' => 5000,
    ],
],

```

クリーンアップの設定はライブラリのルールがあるのでドキュメントで確認する
https://spatie.be/docs/laravel-backup/v6/cleaning-up-old-backups/overview
※これはバージョン6系統です

### バックアップを作成する

ソースファイルも全部
```
php artisan backup:run
```

通知機能無効オプション
```
php artisan backup:run --disable-notifications
```

DBのみバックアップ
```
php artisan backup:run --only-db
```

クリーンアップ
```
php artisan backup:clean
```

## 定期的なクーロン実行に対応させる
app\Console\Kernel.php以下のscheduleメソッドにコマンドを記述

```php:app\Console\Kernel.php
protected function schedule(Schedule $schedule)
{
    $schedule->command('backup:clean');
    $schedule->command('backup:run --only-db');
}
```

cronを設定する
```
php /your-project-path/artisan schedule:run >> /dev/null 2>&1
```

タスクスケジュールの設定マニュアル
- [Laravel 6.x タスクスケジュール](https://readouble.com/laravel/6.x/ja/scheduling.html)

## 参考記事

- [【Laravel】LaravelのソースもDBも簡単にバックアップが取れる「spatie/laravel-backup」](https://qiita.com/sola-msr/items/87205c592c47d12df1b0)
