import React,{useState} from "react";
import axios,{AxiosError} from "axios";
import { toast } from 'react-toastify';

const TaskInput:React.VFC<{ updateTitle:any }> = ({updateTitle})=> {
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
            updateTitle(title);
            setTitle('');
            toast.success('登録に成功しました');
        })
        .catch((error:AxiosError) => {
            if(error.response?.data.errors){
                Object.values(error.response?.data.errors).map(
                    (messages:any) =>{
                        messages.map((message:string) =>{
                            toast.error(message);
                        })
                    }
                )
            }else{
                toast.error('登録に失敗しました');
            }
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
