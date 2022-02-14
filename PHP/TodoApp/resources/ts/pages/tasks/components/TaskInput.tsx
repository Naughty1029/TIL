import React,{useState} from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const TaskInput:React.VFC = ()=> {
    const [title,setTitle] = useState('');

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        createTask(title);
    }

    const createTask = (title:string) => {
        axios.post(
            `api/tasks`,
            { title:title }
        )
        .then((res)=>{
            setTitle('');
            toast.success('登録に成功しました');
        })
        .catch(error => {
            toast.error('登録に失敗しました');
        });;
    }

    return (
        <form className="input-form" onSubmit={handleSubmit}>
            <div className="inner">
                <input
                    type="text"
                    className="input"
                    placeholder="TODOを入力してください。"
                    value={title}
                    onChange = {(e)=>setTitle(e.target.value)}
                />
                <button className="btn is-primary">追加</button>
            </div>
        </form>
    );
}

export default TaskInput;
