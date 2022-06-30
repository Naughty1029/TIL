とりあえずサンプルコードのみ  
参考リンク先:https://www.webopixel.net/javascript/1647.html

App.js
```javascript
import { createContext, useReducer } from "react";
import { Parent } from "./Parent";

export const AppContext = createContext({});

const reducer = (state, action) => {
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

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Parent />
    </AppContext.Provider>
  );
}
```

Parent.js
```javascript
import { useContext } from "react";
import { AppContext } from "./App";
import { Child } from "./Child";

export const Parent = () => {
  const { state } = useContext(AppContext);
  return (
    <>
      <div>Count:{state.count}</div>
      <Child />
    </>
  );
};
```

Child.js

```javascript
import { useContext } from "react";
import { AppContext } from "./App";

export const Child = () => {
  const { dispatch } = useContext(AppContext);
  return (
    <>
      <div>Child</div>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>UP</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>DOWN</button>
    </>
  );
};
```