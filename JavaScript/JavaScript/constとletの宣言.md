## var
ES2015以前の変数宣言はvarのみ  
上書きと再宣言ができるのでルールが緩い

```javascript
var val1 = "var変数";
console.log(val1);

//上書き可能  
val1 = "var変数を上書き";
console.log(val1);

//v再宣言可能
var val1 = "var変数を再宣言";
console.log(val1);
```

## let
ES2016以降に追加された変数宣言
再宣言ができない。上書きは可能。
```javascript
let val2 = "let変数";
console.log(val2);

//上書き可能
val2 = "let変数を上書き";
console.log(val2);

//再宣言不可
let val2 = "let変数を再宣言";
console.log(val2);
```

## const
ES2016以降に追加された変数(定数)宣言
再宣言と上書きの両方ができない。
```javascript
const val3 = "const定数";
console.log(val3);

//上書き不可
val3 = "const定数を上書き";
console.log(val3);

//再宣言不可
const val3 = "const定数を再宣言";
console.log(val3);
```

ただし、オブジェクト・配列の中身は変更可能  
オブジェクト・配列を定義するときはconstを使うのがよい
```javascript
/**--------
オブジェクト
--------**/
const val4 = {
  name: "namae",
  age: 30
};

console.log(val4);

// 変更可能
val4.name = "変更";
// 追加も可能
val4.address = "住所";

console.log(val4);

/**--------
配列
--------**/
const val５ = ["dog", "cat"];

// 変更可能
val５[0] = "bird";
// 追加も可能
val５.push("mokey");

console.log(val５);
```
