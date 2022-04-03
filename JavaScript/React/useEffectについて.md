## ライフサイクルとは
- コンポーネントが生まれてから破棄されるまでの時間の流れ
- ライフサイクルメソッドを使うと、時点に応じた処理を実行できる
- Class Component時代は以下の３メソッドで処理していた
- Hooks時代はuseEffectでライフサイクルメソッドを実装する

**Class Componentの時**
```
componentDidMound()
componentDidUpdate()
componentWillUnmount()
```

## 3種類のライフサイクル
1.Mouting <br>
→コンポーネントが生まれる期間　<br>
2.Updating <br>
→コンポーネントが更新される期間<br>
3.Unmouting <br>
→コンポーネントが破棄される期間<br>

それぞれ、マウント後の処理・更新後の処理・破棄前の処理を実装する

## useEffect
実行のタイミングは第二引数に依存させることができる

```javascript
import { useEffect, useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [trigger, setTrigger] = useState(true);
  const countUp = () => {
    setCount((prevState) => prevState + 1);
  };

  const countDown = () => {
    setCount((prevState) => prevState - 1);
  };

  const toggleTrigger = () => {
    setTrigger((prevState) => !prevState);
  };

  //毎回実行
  useEffect(() => {
    console.log("毎回実行");
  });

  //初回レンダリング後のみ
  useEffect(() => {
    console.log("初回レンダリング");
  }, []);

  //countが変更される度に実行
  useEffect(() => {
    console.log("実行1");
  }, [count]);

  //countかtriggerが変更される度に実行
  useEffect(() => {
    console.log("実行2");
  }, [count, trigger]);

  return (
    <div>
      <p>現在のカウント数: {count}</p>
      <button onClick={countUp}>countUp</button>
      <button onClick={countDown}>countDown</button>
      <button onClick={toggleTrigger}>toggle</button>
    </div>
  );
};

export default Counter;
```

## クリーンアップを理解
- コンポーネント内で外部データベースを購読したい
- useEffect内で購読処理を呼び出す
- 必要無くなったらクリーンアップ関数を使って掃除する

再レンダリングする前にクリーンアップ関数が必ず実行される

```javascript
import { useEffect, useState } from "react";

const Toggle = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen((prevState) => !prevState);
  };

  //毎回実行
  useEffect(() => {
    console.log("Current State is", open);
    if (open) {
      console.log("Subscribe database");
    }
    return () => {
      console.log("Unsubscribe database");
    };
  });

  return (
    <div>
      <button onClick={toggle}>{open ? "OPEN" : "CLOSE"}</button>
    </div>
  );
};

export default Toggle;
```

