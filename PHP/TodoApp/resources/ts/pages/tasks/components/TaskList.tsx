import React,{useEffect,useState} from "react";
import axios from "axios";
import { Task } from "../../../types/Task";
import TaskItem from "./TaskItem";

const TaskList:React.VFC = ()=> {
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
        <div className="inner">
            <ul className="task-list">
                { tasks.map( task => (
                    <TaskItem key={task.id} task={task}/>
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
    );
}

export default TaskList;
