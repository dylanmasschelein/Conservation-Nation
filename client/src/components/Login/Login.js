import "./Login.scss";
import { useState } from "react";
import axios from "axios";

const Login = (props) => {
  const { setOpen, setOpenLogin, setModalText, setToggleModal, setRedirect } =
    props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const successAlert = (token) => {
    sessionStorage.setItem("token", token);
    setRedirect("/profile");
    setToggleModal(true);
    setModalText("Successfully logged in! Welcome!");
    setOpenLogin(false);
    setOpen(false);
  };

  const failedAlert = (alert) => {
    setToggleModal(true);
    setModalText(alert);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const login = {
      email,
      password,
    };
    try {
      // http://localhost:8080/user/login
      const res = await axios.post(`/user/login`, login);

      res.data.status === "ok"
        ? successAlert(res.data.data)
        : failedAlert(res.data.error);
    } catch (err) {
      console.log(err);
    }
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
