- コールバック関数が 0 未満（例えば-1）を返した場合：a は b の前に来る（順番は変わらない）
- コールバック関数が 0 より大きい値（例えば 1）を返した場合：b は a の前に来る（順番が変わる）
- コールバック関数が 0 を返した場合：何もしない

```javascript
const numbers = [2, 5, 100, 4];

numbers.sort(function (a, b) {
  return a - b;
});

console.log(numbers);
// 結果：[2, 4, 5, 100]
```

```javascript
const numbers = [2, 5, 100, 4];

numbers.sort(function (a, b) {
  return b - a;
});

console.log(numbers);
// 結果：[100, 5, 4, 2]
```

```javascript
const array = ["hoge", "foobar", "fugafuga", "bar"];

array.sort(function (a, b) {
  return a.length - b.length;
});

console.log(array);
// 結果：["bar", "hoge", "foobar", "fugafuga"]
```

```javascript
const classes = ["部長", "課長", "係長", "社員"];

const members = [
  { name: "山田", clazz: "係長" },
  { name: "鈴木", clazz: "部長" },
  { name: "田中", clazz: "社員" },
  { name: "佐藤", clazz: "課長" },
];

members.sort(function (a, b) {
  return classes.indexOf(a.clazz) - classes.indexOf(b.clazz);
});

console.log(members);
/* 結果：
[
  {name: "鈴木", clazz: "部長"}
  {name: "佐藤", clazz: "課長"}
  {name: "山田", clazz: "係長"}
  {name: "田中", clazz: "社員"}
]
*/
```

url https://dezanari.com/js-sort/
