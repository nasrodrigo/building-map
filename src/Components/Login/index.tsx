import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import { FeedbackMessage, User } from "../../Interfaces/Login";
import { getUsers } from "../../Servers/LoginServer";

const Login = () => {
  const feedbackMessage = useRef<HTMLDivElement>(null);

  const [loginState, setLoginState] = useState<User>({
    userName: "",
    password: "",
    isAdmin: false,
  });
  const [feedbackMessageState, setFeedbackMessageState] =
    useState<FeedbackMessage>({ msg: "", color: "" });

  const navigate = useNavigate();

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    for (let key in loginState) {
      if (key === event.target.name) {
        setLoginState({
          ...loginState,
          [event.target.name]: event.target.value,
        });
      }
    }
  };

  const loginHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    getUsers().then((data) => {
      if (!data) {
        return;
      }

      let login: User;
      let count: number = 0;

      for (const key in data) {
        login = data[key];

        if (
          login.userName === loginState.userName &&
          login.password === loginState.password
        ) {
          setLoginState(login);
          navigate(
            "/map?userName=" + login.userName + "&isAdmin=" + login.isAdmin
          );
          return;
        } else {
          count++;
        }
      }

      if (count === Object.keys(data).length) {
        setFeedbackMessageState({ msg: "User not found", color: "red" });
        navigate("/");
      }
    });
  };

  return (
    <>
      <form className={classes.loginForm} onSubmit={loginHandler}>
        <div>
          <h3>Log In</h3>
        </div>
        <div ref={feedbackMessage} className={classes.feedbackMessage}>
          <p
            style={{
              color: feedbackMessageState
                ? feedbackMessageState.color
                : undefined,
            }}
          >
            {feedbackMessageState ? feedbackMessageState.msg : undefined}
          </p>
        </div>
        <div>
          <input
            type="text"
            name="userName"
            value={loginState.userName}
            onChange={inputChangeHandler}
            id="userName"
            placeholder="User Name"
            title="Field user name"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={loginState.password}
            onChange={inputChangeHandler}
            id="password"
            placeholder="Password"
            title="Field password"
          />
        </div>
        <div className={classes.btn}>
          <button type="submit" title="Button Login">
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
