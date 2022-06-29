### useReducerの概要理解
![image](https://raw.githubusercontent.com/Naughty1029/TIL/main/Images/JavaScript/useReducer/usereducer.jpg)

useReducerとはstateを用意・管理するためのHooksです。  
主に以下3つの登場人物を理解する必要があります。  

### useReducer関数
引数
- reducer関数（）
- stateの初期値

返り値
- state
- dispatch関数（stateを更新する関数）

## useReducerを実装する
それでは実際にuseReducerを使ってコードを書いていきます。  
実装するものカウントアップとダウンができる簡単なものです。  

なおコードは下記サイトのものを参考にさせていただきました。  
わかりやすいコードありがとうございます。

https://www.webopixel.net/javascript/1647.html

### Childコンポーネントを作る
![image](https://raw.githubusercontent.com/Naughty1029/TIL/main/Images/JavaScript/useReducer/no01.gif)


### useReducerを定義する
![image](https://raw.githubusercontent.com/Naughty1029/TIL/main/Images/JavaScript/useReducer/no02.gif)

### Reducer関数を定義する
![image](https://raw.githubusercontent.com/Naughty1029/TIL/main/Images/JavaScript/useReducer/no03.gif)

### dispatch関数を定義する
![image](https://raw.githubusercontent.com/Naughty1029/TIL/main/Images/JavaScript/useReducer/no04.gif)

## コードリンク先
今回、gifにしたコードは下記リンクにあります。
https://codesandbox.io/s/usereducer-basic-6us96l


## 参考リンク先
今回の記事を執筆するにあたり下記リンク先を参考にさせて頂きました。  
ぜひリンク先も参照してみてください。
- [react-hooks useReducerメモ](https://qiita.com/OmeletteCurry19/items/719c6666940dfe56a7af)
- [Reactの標準機能（useContext/useReducer）でステート管理[TypeScript版]](https://www.webopixel.net/javascript/1647.html)
- [【手書きプログラミング】useReducerとは【React】](https://www.youtube.com/watch?v=iRdoznRFSe8&t=302s)