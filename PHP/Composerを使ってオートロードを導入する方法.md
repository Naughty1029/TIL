## PHPのオートロードとは

別ファイルのクラスを自動で読み込む仕組みのこと。

プロジェクトの規模が大きくなった時に、色々な別ファイルのクラスを使用する場合、下記のようにひとつひとつ明示的に読み込む必要があります。

```php
require_once "hogehoge.php";
```

これを自動的に読み込んでくれる仕組みがオートロードです。

---

## Step1. Composerでautoloadファイルを生成する

まず下記コマンドでcomposer.jsonを作成します。

```
composer init
```

Composer.jsonに下記を追加します。

```json
{
    "autoload": {
        "psr-4": {
            "App\\": "app/"
        }
    }
}
```

**Point**

- PSR-4というルールに従ってオートロードを使用します。
- 物理ディレクトリapp配下をAppから始まる名前空間として使用します。

composer installします。

```
composer install
```

これでvendorディレクトリが作成され、autoload.phpも出来上がります。

```
│  composer.json
│
└─ vendor ─ autoload.php
│ 
└─ app
```

ちなみにcomposer.jsonファイルの変更をしたらcomposer updateが必要です。

ただし、autoload部分の変更だけであればdumpautoloadで変更が反映されます。

```
composer update
composer dumpautoload
```

---

## Step2. 実際にautoloadを使ってみる

まずappフォルダ配下にapp / Models / TestModel.phpを設置します。

TestModel.phpに下記を追加してTestModelクラスを作成します。

```php
<?php
namespace App\Models;

//ひとつのファイルにひとつのクラス名を定義する
class TestModel
{
    private $text = 'Hello World';
    public function getHello()
    {
        return $this->text;
    }
}
```

**Point**

- namespaceはさっきautoloadで指定したAppから始める
- namespaceとディレクトリフォルダ名は同一にする
- ひとつのファイルにひとつのクラス名を定義する

つぎにappフォルダ配下にapp / Controllers / TestController.phpを設置して、上記TestModelクラスを呼び出してみます。

```php
<?php
namespace App\Controllers;

//use namespace\クラス名にする
use App\Models\TestModel;

class TestController
{
    public function run()
    {
        $model = new TestModel;
        echo $model->getHello();
    }
}
```

**Point**

- useを使うことで別ファイルのクラスを呼び出すことができる
- use namespace\クラス名にする
- traitのuseとは意味合いが異なるものであることに注意

---

## Step3. app配下以外でautoloadを使う

最後にapp配下以外でautoloadを使い、TestControllerクラスを呼びしてみます。

```php
│  composer.json
│
│  index.php ←ここでTestControllerクラスを呼び出す。
│
└─ vendor ─ autoload.php
│ 
└─ app
	└─ Models ─ TestModel.php
	└─ Controllers ─ TestController.php
```

 

index.phpに以下を記述します。

```php
<?php
require_once __DIR__ . 'vendor/autoload.php';
use App\Controllers\TestController;

$app = new TestController;
$app->run();
```

**Point**

- app配下以外なので、autoload.phpをrequire_onceする

index.phpにアクセスするとHello Worldが表示されます。

## 参考記事
- [PHPのオートロード(autoload)](https://qiita.com/atwata/items/5ba72d3d881a81227c2a)
