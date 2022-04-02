stateを使って、カウントアップなど直前の値を更新するときはprevStateを使って更新すること

ダメな例
setCountに直接stateを渡してしまっている。

```javascript
import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const countUp = () => {
    setCount(count + 1);
  };

  const countDown = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <p>現在のカウント数: {count}</p>
      <button onClick={countUp}>countUp</button>
      <button onClick={countDown}>countDown</button>
    </div>
  );
};

export default Counter;
```


いい例
setCountにはprevStateを渡す

```javascript
import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const countUp = () => {
    setCount((prevState) => prevState + 1);
  };

  const countDown = () => {
    setCount((prevState) => prevState - 1);
  };

  return (
    <div>
      <p>現在のカウント数: {count}</p>
      <button onClick={countUp}>countUp</button>
      <button onClick={countDown}>countDown</button>
    </div>
  );
};

export default Counter;
```

## 参考記事
[【React】そろそろ技術ブログで setCount(count + 1) と書くのはやめませんか](https://zenn.dev/stin/articles/use-appropriate-api)
