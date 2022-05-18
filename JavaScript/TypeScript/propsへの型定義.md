?を指定することで型定義の必須条件を外すことができる。  
また必須じゃない場合、propsの初期値を設定しておいてあげるといい。
```javascript
type TodoType = {
  userId: number;
  title: string;
  completed?: boolean;
};

export const Todo = (props: TodoType) => {
    //propsの初期値を設定する
    const { title, userId, completed = false } = props;
    const completeMark = completed ? "[完]" : "[未]";
    return <p>{`${completeMark}${title}(ユーザー：${userId})`}</p>;
};
```
