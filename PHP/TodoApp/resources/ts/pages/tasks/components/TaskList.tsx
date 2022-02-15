import React,{useEffect,useState} from "react";
import axios from "axios";
import { Task } from "../../../types/Task";
import TaskItem from "./TaskItem";

const TaskList:React.VFC<{ title:string }>  = ({title})=> {
    const [tasks, setTasks] = useState<Task[]>([]);

    //削除時の再描画用
    const updateTasks = (index:number) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    }

    //1番最初の描画用
    const getTasks = () => {
        axios.get('api/tasks').then((res)=>{
            setTasks(res.data);
        });
    }

    useEffect(()=>{
        getTasks();
    },[title]);

    return (
        <div className="inner">
            <ul className="task-list">
                { tasks.map( (task,index) => (
                    <TaskItem key={task.id} index={index} task={task} updateTasks={updateTasks}/>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
