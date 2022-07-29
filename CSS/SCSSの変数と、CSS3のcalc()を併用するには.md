---
title: SCSSの変数と、CSS3のcalc()を併用するには
tags: scss Sass CSS
author: mtmtkzm
slide: false
---
SCSSの変数が展開されず文字列としてそのままCSSに出力される問題の解決法です。

## こんなSCSSを書いたとするよ。

```scss:scss
$var: 300px;
.box {
	width: calc( 100% - $var );
}
```

## コンパイル結果（`.css`）は、


```css:css
/* これが理想だけど */
.box {
	width: calc( 100% - 300px );
}

/* 現実はこう（`$var`が展開されず、SCSSがCSSとしてそのまま出力される・・） */
.box {
	width: calc( 100% - $var );
}
```

## これをどうすればいいかというと、こうすればいいらしい。

```scss:scss
$var: 300px;
.box {
    width: calc( 100% - #{$var} );
}
```

## 半角スペースも必要
ちなみに、四則演算記号の前後には半角スペースが必要です。これじゃダメ。
これは `calc()` の話。

```scss:scss
$var: 300px;
.box {
    width: calc( 100%-#{$var} );
}
```

## 参考記事
https://qiita.com/mtmtkzm/items/2e3aef1b504ebcde5311