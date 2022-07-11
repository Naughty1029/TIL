React.Dispatch<React.SetStateAction<number>>を使う　　
  
まだ調査中だけど、useStateの型定義は以下のようになるらしい。  
  
ここにDispatchがどう絡むの？
useState's type is actually:  

```javascript
type UseState<S> = (action: S | ((prevState: S) => S)) => void;
```

```javascript
import React, { useState } from "react";

const Parent: React.FC = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>カウント: {count}</h1>
      <Child count={count} setCount={setCount} />
    </div>
  );
};

type Props = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

const Child: React.VFC<Props> = ({ count, setCount }) => {
  return (
    <>
      <p>子コンポーネント</p>
    </>
  );
};

export default Parent;
```
