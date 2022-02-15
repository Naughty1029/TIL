import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  RouteProps,
  Redirect
} from "react-router-dom";
import HelpPage from "./pages/help";
import LoginPage from "./pages/login";
import TaskPage from "./pages/tasks";
import axios from "axios";
import { useAuth } from "./hooks/AuthContext";
import NotFoundPage from "./pages/error";

const Router = () => {
    const { setIsAuth,isAuth } = useAuth();

    const GuardRoute = (props:RouteProps) => {
        if(!isAuth) return <Redirect to="/login" />
        return <Route {...props} />
    }

    const LoginRoute = (props:RouteProps) => {
        if(isAuth) return <Redirect to="/" />
        return <Route {...props} />
    }

    const handleLogout = () =>{
        axios.post('/api/logout').then(res => {
            if(res.status === 200){
                setIsAuth(false);
            }
        })
    }

    const navigation = (
        <header className="global-head">
            <ul>
                <li><Link to="/">ホーム</Link></li>
                <li><Link to="/help">ヘルプ</Link></li>
                <li onClick={handleLogout}><span>ログアウト</span></li>
            </ul>
        </header>
    );

    const loginNavigation = (
        <header className="global-head">
            <ul>
                <li><Link to="/help">ヘルプ</Link></li>
                <li><Link to="/login">ログイン</Link></li>
            </ul>
        </header>
    );

    return (
        <BrowserRouter>
            {isAuth ? navigation : loginNavigation}
            <Switch>
                <Route path="/help">
                    <HelpPage />
                </Route>
                <LoginRoute path="/login">
                    <LoginPage />
                </LoginRoute>
                <GuardRoute exact path="/">
                    <TaskPage />
                </GuardRoute>
                <Route component={NotFoundPage} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router;
