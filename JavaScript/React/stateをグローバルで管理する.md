glbalな環境でstateを管理するにはContextという機能を使う。

ざっくりとして流れとしては

- Contextを作る
- ContextのなかのProviderを使いglobalなstateを使える環境を準備する
- globalなstateを使いたいコンポーネント内でuseContextを利用する

以下実践例のフォルダ構成は下記

index.jsx

App.jsx

providers/TestProvider.jsx

components/Child01.jsx

## TestProvider.jsx

providersフォルダを作成し、その中にTestProvider.jsxを配置する

```jsx
import { createContext, useState } from "react";
//1.Contextを作る。他の画面でも参照できるようにexportする
export const TestContext = createContext({});

//2.globalなstate管理をするためには、UseContextのProviderで囲む必要がある
//3.propsとしてchildrenを受け取り、それをContextのProviderで囲ってexportできるようにする
//4.実際にglobalに参照する値をProviderのvalueに分割代入で渡しておく
export const TestProvider = (props) =>{
    //8.stateにして、どのコンポーネントからでも変更できるようにする
    //9.valueに渡す
    const [testInfo,setTestInfo] = useState(false)
    const contextName = "aaa";
    const {children} = props;
    return (
        <TestContext.Provider value={{contextName,testInfo,setTestInfo}}>
            {children}
        </TestContext.Provider>
    )
}
```

## App.jsx

```jsx
import { Child01 } from "./components/Child01";
import "./styles.css";
import { TestProvider } from "./providers/TestProvider";

//5.Providerをimportして、componentを囲む
export const App = ()=> {
  return (
    <TestProvider>
      <Child01></Child01>
    </TestProvider>
  );
}
```

## Child01.jsx

```jsx
//6.global stateを使うにはuseContextを使う
//7.useContext()の引数には、どのContextを使うのか分かるように、createContextで作ったContexを渡す
//9.実際に変更できるか試してみる
import React,{ useContext } from "react";
import { TestContext } from "../providers/TestProvider";

export const Child01 = ()=>{
    const {contextName,testInfo,setTestInfo} = useContext(TestContext);
    const onClickChangeState =()=>{
        setTestInfo(!testInfo);
    }
    return (
        <>
            <div>Child01ページ</div>
            <p>{contextName}</p>
            <p>{testInfo}</p>
            <button onClick={onClickChangeState}>{testInfo?"true":"false"}</button>
        </>
    );
}
```
