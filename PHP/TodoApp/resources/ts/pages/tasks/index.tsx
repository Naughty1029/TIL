import React,{useState} from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

const TaskPage:React.VFC = () => {
    const [title,setTitle] = useState<string>('');
    const updateTitle = (text:any) => {
        setTitle(text);
        setTitle('');
    }
    return (
        <>
            <TaskInput updateTitle={updateTitle}/>
            <TaskList title={title}/>
        </>
    )
}

export default TaskPage;
