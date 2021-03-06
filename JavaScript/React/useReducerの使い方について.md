### useReducerの概要理解

useReducerとはstateを用意・管理するためのHooksです。  
主に以下3つの登場人物を理解する必要があります。  

### useReducerについて
引数
- reducer関数（stateの更新方法をまとめた関数）
- stateの初期値

返り値
- state
- dispatch関数（stateを更新する関数）

### reducer関数について
引数
- 更新前のstate
- actionオブジェクト（主にtypeとpayloadプロパティがある）

返り値
- reducerで更新された新しいstate

### dispatch関数について
引数
- actionオブジェクト（主にtypeとpayloadプロパティがある）

返り値
- void

## useReducerを実装する
それでは実際にuseReducerを使ってコードを書いていきます。  
実装するものカウントアップとダウンができる簡単なものです。  

なおコードは下記サイトのものを参考にさせていただきました。  
わかりやすいコードありがとうございます。

https://www.webopixel.net/javascript/1647.html

### Childコンポーネントを作る
App.tsx
```javascript
import "./styles.css";
import { Child } from "./Child";

export default function App() {
  return (
    <div className="App">
      <Child />
    </div>
  );
}
```

Child.tsx
```javascript
import React from "react";

export const Child: React.FC = () => {
  return (
    <div>
      <h1>カウント:</h1>
      <button>UP</button>
      <button>DOWN</button>
    </div>
  );
};
```

- App.tsxに配置するChildコンポーネントを定義
- 数値を更新するためのボタンを設置しておく

### useReducerを定義する
Child.tsx
```javascript
import React, { useReducer } from "react";//追記

const initialState = {//追記
  count: 0
};

export const Child: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);//追記
  return (
    <div>
      <h1>カウント:{state.count}</h1>//追記
      <button>UP</button>
      <button>DOWN</button>
    </div>
  );
};
```

- useReducerを定義する
- useReducerの第二引数にわたす初期値をinitialStateとする
- initialStateのcountプロパティとして0を定義

### reducer関数を定義する
```javascript
import React, { useReducer } from "react";

type State = {//追記
  count: number;
};

type Action = { type: "INCREMENT" } | { type: "DECREMENT" };//追記

const reducer = (state: State, action: Action) => {//追記
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1
      };

    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1
      };

    default:
      return state;
  }
};

const initialState = {
  count: 0
};

export const Child: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <h1>カウント:{state.count}</h1>
      <button>UP</button>
      <button>DOWN</button>
    </div>
  );
};
```

- reducer関数を定義し、引数にstateとactionをわたす
- stateとactionの型定義をする
- switch文を記述し、actionオブジェクトのtypeプロパティで分岐させる
- typeプロパティが'INCREMENT'ならcountを1増やす
- typeプロパティが'DECREMENT'ならcountを1減らす
- 新しく更新したstateをreturnする

### dispatch関数を定義する
Child.tsx
```javascript
import React, { useReducer } from "react";

type State = {
  count: number;
};

type Action = { type: "INCREMENT" } | { type: "DECREMENT" };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1
      };

    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1
      };

    default:
      return state;
  }
};

const initialState = {
  count: 0
};

export const Child: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <h1>カウント:{state.count}</h1>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>UP</button>//追記
      <button onClick={() => dispatch({ type: "DECREMENT" })}>DOWN</button>//追記
    </div>
  );
};
```

- ボタンのクリックイベントでdispatch関数を発火させる
- dispatch関数の引数にはactionオブジェクトとしてtypeプロパティを渡す
- typeプロパティはボタンがUPなら'INCREMENT'、DOWNなら'DECREMENT'にする
- dispatch関数がreducer関数を呼び出すので、数値が更新される

## コードリンク先
今回、gifにしたコードは下記リンクにあります。  
https://codesandbox.io/s/usereducer-basic-6us96l


## 参考リンク先
今回の記事を執筆するにあたり下記リンク先を参考にさせて頂きました。  
ぜひリンク先も参照してみてください。
- [react-hooks useReducerメモ](https://qiita.com/OmeletteCurry19/items/719c6666940dfe56a7af)
- [Reactの標準機能（useContext/useReducer）でステート管理[TypeScript版]](https://www.webopixel.net/javascript/1647.html)
- [【手書きプログラミング】useReducerとは【React】](https://www.youtube.com/watch?v=iRdoznRFSe8&t=302s)