```javascript
//TypeScriptの基本の型

//boolean
let bool: boolean = true;

//number
let num: number = 0;

//string
let string: string = "text";

//array 2通りある
let arr1: Array<number> = [0, 1, 2];
let arr2: number[] = [0, 1, 2];

//tuple 複数の値を保持することのできる型
let tuple: [number, string] = [0, "text"];

//any なるべく使わない
let any1: any = false;

//void 返却値がない関数
const funcA = (): void => {
  const test = "Test";
};

//null
let null1: null = null;

//undefined
let undefined1 = undefined;

//object 2通りある
let obj1: object = {};
let obj2: {} = {};

//objectの中に対しても型を指定できる
let obj3: { id: number; name: string } = { id: 0, name: "hoge" };
```
