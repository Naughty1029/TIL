import axios from "axios";
import React,{ useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";

const LoginPage:React.VFC = () => {
    const [email,setEmail] = useState('admin@example.com');
    const [password,setPassWord] = useState('12345678');
    const { setIsAuth } = useAuth();

    const handleLogin = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post('/api/login',{
            email:email,
            password:password,
        }).then(res => {
            if(res.status === 200){
                setIsAuth(true);
            }
        });
    }

    return (
        <div className="login-page">
            <div className="login-panel">
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>メールアドレス</label>
                        <input
                            type="email"
                            className="input"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>パスワード</label>
                        <input
                            type="password"
                            className="input"
                            value={password}
                            onChange={(e)=>setPassWord(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn">ログイン</button>
                </form>
            </div>
            <div className="links"><Link to="/help">ヘルプ</Link></div>
        </div>
    )
}

export default LoginPage;
