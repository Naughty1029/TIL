import React,{useEffect,useState} from "react";
import axios from "axios";
import { Task } from "../../types/Task";

const TaskPage:React.VFC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const getTasks = () => {
        axios.get('api/tasks').then((res)=>{
            setTasks(res.data);
        });
    }

    useEffect(()=>{
        getTasks();
    },[]);

    return (
        <>
            <form className="input-form">
                <div className="inner">
                    <input type="text" className="input" placeholder="TODOを入力してください。" value="" />
                    <button className="btn is-primary">追加</button>
                </div>
            </form>
            <div className="inner">
                <ul className="task-list">
                    { tasks.map( task => (
                        <li key={task.id}>
                            <label className="checkbox-label">
                                <input type="checkbox" className="checkbox-input" />
                            </label>
                            <div><span>{task.title}</span></div>
                            <button className="btn is-delete">削除</button>
                        </li>
                    ))}

                    <li>
                        <label className="checkbox-label">
                            <input type="checkbox" className="checkbox-input" />
                        </label>
                        <form><input type="text" className="input" value="編集中のTODO"></input></form>
                        <button className="btn">更新</button>
                    </li>
                    <li className="done">
                        <label className="checkbox-label">
                            <input type="checkbox" className="checkbox-input" />
                        </label>
                        <div><span>実行したTODO</span></div>
                        <button className="btn is-delete">削除</button>
                    </li>
                    <li>
                        <label className="checkbox-label">
                            <input type="checkbox" className="checkbox-input" />
                        </label>
                        <div><span>ゴミ捨て</span></div>
                        <button className="btn is-delete">削除</button>
                    </li>
                    <li>
                        <label className="checkbox-label">
                            <input type="checkbox" className="checkbox-input" />
                        </label>
                        <div><span>掃除</span></div>
                        <button className="btn is-delete">削除</button>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default TaskPage;
