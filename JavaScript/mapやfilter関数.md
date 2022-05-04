### map関数
```javascript
//配列をループして中身を表示する
const nameArr = ["田中", "山田", "高橋"];

//従来の方法
for (let index = 0; index < nameArr.length; index++) {
  console.log(`${index}番目は${nameArr[index]}です`);
}

//map関数の場合 第二引数はindexが入る
nameArr.map((name, index) => console.log(`${index}番目は${name}です`));

//map関数の記法
//与えられた関数を配列のすべての要素に対して呼び出し、その結果からなる新しい配列を生成する
const nameArr2 = nameArr.map((name) => {
  return name;
});

console.log(nameArr2); //["田中", "山田", "高橋"]
```

### filter関数
```javascript
//与えられた関数によって実装された条件式に合致する値からなる新しい配列を生成する
const numArr = [1, 2, 3, 4, 5];
const newNumArr = numArr.filter((num) => {
  return num % 2 === 1; //条件式に該当する値のみ返す
});

console.log(newNumArr); //[1,3,5]
```

### 高橋以外は「さん」付けにするプログラム
```javascript
const nameArr３ = ["田中", "山田", "高橋"];
const newNameArr = nameArr３.map((name) => {
  if (name === "高橋") {
    return name;
  } else {
    return `${name}さん`;
  }
});

console.log(newNameArr); //["田中さん", "山田さん", "高橋"]
```
