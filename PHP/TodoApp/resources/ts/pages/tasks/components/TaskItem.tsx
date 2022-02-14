import React,{useState} from "react";
import { Task } from "../../../types/Task";
import axios from "axios";
import { toast } from 'react-toastify';

type Props = {
    task:Task
}

const TaskItem:React.VFC<Props> = ({task})=> {
    const [tasks, setTasks] = useState<Task>(task);

    const updateDoneTask = (id:number,is_done:boolean) => {
        axios.patch(
            `api/tasks/update-done/${id}`,
            { is_done:!is_done }
        )
        .then((res)=>{
            setTasks(res.data);
        })
        .catch(error => {
            toast.error('更新に失敗しました');
        });;
    }
    return (
        <li key={tasks.id} className={tasks.is_done ? "done" : ""}>
            <label className="checkbox-label">
                <input
                type="checkbox"
                className="checkbox-input"
                onClick={()=> updateDoneTask(tasks.id,tasks.is_done)}
                />
            </label>
            <div><span>{tasks.title}</span></div>
            <button className="btn is-delete">削除</button>
        </li>
    );
}

export default TaskItem;
