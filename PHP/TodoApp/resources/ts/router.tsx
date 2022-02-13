import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HelpPage from "./pages/help";
import LoginPage from "./pages/login";
import TaskPage from "./pages/tasks";

const Router = () => {
    return (
        <BrowserRouter>
            <header className="global-head">
                <ul>
                    <li><Link to="/">ホーム</Link></li>
                    <li><Link to="/help">ヘルプ</Link></li>
                    <li><Link to="/login">ログイン</Link></li>
                    <li><span>ログアウト</span></li>
                </ul>
            </header>

            <Switch>
                <Route path="/help">
                <HelpPage />
                </Route>
                <Route path="/login">
                <LoginPage />
                </Route>
                <Route path="/">
                <TaskPage />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

function Home() {
    return <h2>Home</h2>;
  }

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}


export default Router;
