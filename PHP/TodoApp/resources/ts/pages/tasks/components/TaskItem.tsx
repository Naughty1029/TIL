import React,{useState} from "react";
import { Task } from "../../../types/Task";
import axios from "axios";
import { toast } from 'react-toastify';

type Props = {
    index:number
    task:Task
    updateTasks:any
}

const TaskItem:React.VFC<Props> = ({index,task,updateTasks})=> {
    console.log(index);
    const [tasks, setTasks] = useState<Task>(task);
    const [editTitle, setEditTitle] = useState<string|undefined>(undefined);

    //チェックボタン用
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

    //編集用
    const updateTask = (id:number,task:Task) => {
        axios.put(
            `api/tasks/${id}`,task
        )
        .then((res)=>{
            setTasks(res.data);
            toast.success('更新に成功しました');
        })
        .catch(error => {
            toast.error('更新に失敗しました');
        });;
    }

    //削除用
    const deleteTask = (id:number) => {
        axios.delete(
            `api/tasks/${id}`
        )
        .then((res)=>{
            updateTasks(index);
            toast.success('削除に成功しました');
        })
        .catch(error => {
            toast.error('削除に失敗しました');
        });;
    }

    //タイトルが切り替わる処理
    const handleToggleEdit = ()=> {
        setEditTitle(tasks.title);
    }

    //stateの更新
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEditTitle(e.target.value);
    }

    //更新ボタンを押下時に更新する
    const handleUpdate = (e:React.FormEvent<HTMLFormElement> |React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(!editTitle){
            toast.error('タイトルを入力してください');
            return;
        }
        const newTask = {...tasks};
        newTask.title = editTitle;
        updateTask(tasks.id,newTask);
        setEditTitle(undefined);
    }

    //入力フォームを抜ける処理
    const handleOnKey = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(['Escape','Tab'].includes(e.key)){
            setEditTitle(undefined);
        }
    }

    //タイトル入力フォーム出力
    const itemInput = () => {
        return (
            <>
                <form onSubmit={handleUpdate}>
                    <input
                        type="text"
                        className="input"
                        defaultValue={tasks.title}
                        onChange = {handleInputChange}
                        onKeyDown = {handleOnKey}
                    />
                </form>
                <button className="btn" onClick={handleUpdate}>更新</button>
            </>
        )
    }

    //タイトルを出力
    const itemText = ()=> {
        return (
            <>
                <div onClick={handleToggleEdit}>
                    <span>{tasks.title}</span>
                </div>
                <button className="btn is-delete" onClick={()=> deleteTask(tasks.id)}>削除</button>
            </>
        )
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
            {editTitle === undefined ? itemText() : itemInput()}
        </li>
    );
}

export default TaskItem;
