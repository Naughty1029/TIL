ES２０１５以前の変数宣言はvarのみ

```javascript
var val1 = "var変数";
console.log(val1);
```

var変数は上書き可能
```javascript
val1 = "var変数を上書き";
console.log(val1);
```

var変数を再宣言可能
```javascript
var val1 = "var変数を再宣言";
console.log(val1);
```javascript

let変数
```javascript
let val2 = "let変数";
console.log(val2);
```

let変数は上書き可能
```javascript
val2 = "let変数を上書き";
console.log(val2);
```

let変数を再宣言不可
```javascript
let val2 = "let変数を再宣言";
console.log(val2);
```

conts変数
```javascript
const val3 = "const変数";
console.log(val3);
```

const変数は上書き不可
```javascript
val3 = "const変数を上書き";
console.log(val3);
```

const変数を再宣言不可
```javascript
const val3 = "const変数を再宣言";
console.log(val3);
```

オブジェクト・配列の中身は変更可能. 
オブジェクト・配列を定義するときはconstを使う
```javascript
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
```

オブジェクト・配列の中身は変更可能. 
オブジェクトを定義するときはconstを使う

```javascript
const val５ = ["dog", "cat"];

// 変更可能
val５[0] = "bird";
// 追加も可能
val５.push("mokey");

console.log(val５);
```
