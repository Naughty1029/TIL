複数のコンポーネントで同じ型を用いる場合は下記のようにexportファイルとして、どこからでも呼び出せるようにする

```javascript
export type TodoType = {
  userId: number;
  title: string;
  completed?: boolean;
};
```

### Pick機能
```javascript
import { TodoType } from "./types/todo";

export const Todo = (
  //Pickを使うと、既存のTypeから必要なものだけを取り出すことができる
  props: Pick<TodoType, "userId" | "title" | "completed">
) => {
  const { title, userId, completed = false } = props;
  const completeMark = completed ? "[完]" : "[未]";
  return <p>{`${completeMark}${title}(ユーザー：${userId})`}</p>;
};
```

### Omit機能

```javascript
import { TodoType } from "./types/todo";

export const Todo = (
  //Omitを使うと、既存のTypeから不要なものを除くことができる
  props: Omit<TodoType, "id">
) => {
  const { title, userId, completed = false } = props;
  const completeMark = completed ? "[完]" : "[未]";
  return <p>{`${completeMark}${title}(ユーザー：${userId})`}</p>;
};

```