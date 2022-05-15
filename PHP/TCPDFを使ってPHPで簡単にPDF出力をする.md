# TCPDFを使ってPHPで簡単にPDF出力をする

作成日: 2021/06/03
技術タグ: PHP
最終更新: June 3, 2021 3:52 PM

## Step1. TCPDFをダウンロードする

TCPDFはオープンソースソフトウェアでありGithubで公開されています。

Githubからはzip形式でダウンロードすることができます。

[https://github.com/tecnickcom/tcpdf](https://github.com/tecnickcom/tcpdf)

zipファイルを解凍したら、好きなところに配置してください。

今回はルートフォルダに「lib」フォルダを作成し、そこに「TCPDF」を配置しています。下記、「lib / TCPDF」に配置したものとし説明を続けます。

## Step2. tcpdfクラスのインスタンスを生成する

まずtcpdf.phpを読み込む必要があります。

```php
include "lib/TCPDF/tcpdf.php";
```

適当な引数を渡したTCPDFクラスのインスタンスを生成します。

```php
$tcpdf = new TCPDF("L", "mm", "A4", true, "UTF-8" );
```

<aside>
💡 第1引数 … PDFの方向(L: 横, P: 縦)
第2引数 … 単位(mm, pt, in など)
第3引数 … 用紙サイズ
第4引数 … unicodeであればtrue
第5引数 … 文字コード

</aside>

インスタンスに対して AddPage メソッドで新しいページを追加します。

```php
$tcpdf->AddPage();
```

インスタンスに対して SetFont メソッドでフォントを指定します。日本語を出力する場合、日本語フォントを指定しなければ文字化けします(??と表示されます)。

```php
$tcpdf->SetFont("kozgopromedium", "", 10);
```

<aside>
💡 第1引数 … フォント名
第2引数 … フォントスタイル(空文字: 標準, B: ボールド, I: イタリック など)
第3引数 … フォントサイズ

</aside>

## Step3. html部分を作成する

HTML部分をヒアドキュメントを使って、変数に格納します。

```php
$html = <<< EOF
<style>
table {width: 500px;}

table th {text-align: center; font-weight: bold;}
table th.no {width: 50px;}
table th.name {width: 150px;}
table th.age {width: 50px;}
table th.address {width: 250px;}

table td.no {text-align: right;}
table td.name {text-align: left;}
table td.age {text-align: right;}
table td.address {text-align: left;}
</style>
<h1>ユーザ一覧</h1>
<table border="1">
  <tr>
    <th class="no">No</th>
    <th class="name">名前</th>
    <th class="age">年齢</th>
    <th class="address">住所</th>
  </tr>
  <tr>
    <td class="no">1</td>
    <td class="name">山田</td>
    <td class="age">25</td>
    <td class="address">東京都港区</td>
  </tr>
  <tr>
    <td class="no">2</td>
    <td class="name">佐藤</td>
    <td class="age">32</td>
    <td class="address">埼玉県さいたま市</td>
  </tr>
  <tr>
    <td class="no">3</td>
    <td class="name">鈴木</td>
    <td class="age">23</td>
    <td class="address">大阪府大阪市</td>
  </tr>
</table>
EOF;
```

## Step4. pdfを生成する

最後にpdfを生成します。

まず、インスタンスに対して writeHTMLメソッドでhtmlで書かれた内容を書き込みます

```php
$tcpdf->writeHTML($html);
```

最後にインスタンスに対して Output メソッドでPDFファイルを出力します。

```php
$tcpdf->Output("user.pdf", "I");
```

<aside>
💡 第1引数 … ファイル名
第2引数 … 出力方法(I: ブラウザに出力, D: ダウンロード など)

</aside>
