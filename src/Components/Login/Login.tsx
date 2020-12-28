import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../firebase";

import classes from "./Login.module.css";

interface LoginParam {
    userName: string,
    password: string,
    isAdmin?: boolean
}

const login: LoginParam = {
    userName: "",
    password: "",
    isAdmin: false
}

interface FeedbackMessage {
    msg: string,
    color: string
}

const Login = () => {

    const feedbackMessage = useRef<HTMLDivElement>(null);
    
    const [loginState, setLoginState] = useState<LoginParam>(login);
    const [feedbackMessageState, setFeedbackMessageState] = useState<FeedbackMessage>({msg: "", color: ""});

    const history = useHistory();

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        for(let key in loginState){
            if(key === event.target.name){
                setLoginState({
                    ...loginState,
                    [event.target.name]: event.target.value,
                });
            }
        }

    }

    const loginHandler = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        firebase.ref('/login').on('value', data => {
            if(!data.val()){
                return;
            }

            let loginData = data.val();
            let login: LoginParam; 
            let count: number = 0;
            
            for(const key in loginData){

                login = loginData[key];

                if(login.userName === loginState.userName && login.password === loginState.password){
                    setLoginState(loginData);
                    history.push("/map?userName=" + login.userName + "&isAdmin=" + login.isAdmin);
                    return;
                }else{
                    count++;
                }
                
            }

            if(count === Object.keys(loginData).length){
                setFeedbackMessageState({msg: "User not found", color: "red"});
                history.push("/");

            }

        });

    }

    return <>
            <form className={classes.loginForm} onSubmit={loginHandler}>
                <div><h3>Log In</h3></div>
                <div ref={feedbackMessage} className={classes.feedbackMessage}>
                    <a style={{color: feedbackMessageState? feedbackMessageState.color : undefined}}>{feedbackMessageState? feedbackMessageState.msg : undefined}</a>
                </div>
                <div>
                    <input type="text" 
                        name="userName" 
                        value={loginState.userName} 
                        onChange={inputChangeHandler} 
                        id="userName" 
                        placeholder="User Name" 
                        title="Field user name"/>
                </div>
                <div>
                    <input type="password" 
                        name="password" 
                        value={loginState.password} 
                        onChange={inputChangeHandler} 
                        id="password" 
                        placeholder="Password" 
                        title="Field password"/>
                </div>
                <div className={classes.btn}>
                    <button type="submit" title="Button Login">Login</button>
                </div>
            </form>
        </>

}

export default Login;
