import "./Login.scss";
import { useState } from "react";
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

  const successAlert = (token) => {
    sessionStorage.setItem("token", token);
    setRedirect("/user/register");
    setToggleModal(true);
    setModalText("Successfully logged in! Welcome!");
    setOpenLogin(true); // switched from false to true if I dont provide token on registration
    setOpen(true); // same same
  };

  const failedAlert = (alert) => {
    setToggleModal(true);
    setModalText(alert);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/user/login`, {
        email,
        password,
      })
      .then((res) => {
        res.data.status === "ok"
          ? successAlert(res.data.data)
          : failedAlert(res.data.error);
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
