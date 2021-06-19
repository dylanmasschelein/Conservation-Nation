import "./Login.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = ({
  setOpen,
  setOpenLogin,
  setModalText,
  setToggleModal,
  setRedirect,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const successAlert = () => {
    setRedirect("/profile");
    setToggleModal(true);
    setModalText("Successfully logged in! Welcome!");
    setOpenLogin(false);
    setOpen(false);
  };

  const failedAlert = () => {
    setToggleModal(true);
    setModalText("Please enter valid username and password");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/user/login`, {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        res.data.status === "ok" ? successAlert() : failedAlert();
        sessionStorage.setItem("token", res.data.data);
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
          type='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
