import "./Login.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = ({ history, setOpen, setOpenLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const successAlert = () => {
    alert("Successfully logged in!");
    history.push("/profile");
  };

  const failedAlert = () => {
    alert("Please enter valid username/password");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/user/login`, {
        username: username,
        password: password,
      })
      .then((res) => {
        res.data.status === "ok" ? successAlert() : failedAlert();
        sessionStorage.setItem("token", res.data.data);
        setOpen(false);
        setOpenLogin(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className='login'>
      <form onSubmit={handleSubmit} className='login__form'>
        <label htmlFor='email' className='login__label login__label--top'>
          Username
        </label>
        <input
          type='username'
          name='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='login__input'
        ></input>

        <label htmlFor='password' className='login__label'>
          Password
        </label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='login__input'
        ></input>
        <button type='submit' className='login__submit'>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
