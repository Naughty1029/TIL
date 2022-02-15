import React from "react";
import Router from "./router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "./hooks/AuthContext";

const App:React.VFC = () => {
    return (
        <AuthProvider>
            <Router />
            <ToastContainer hideProgressBar={true} />
        </AuthProvider>
    )
}

export default App;
