import "./Login.scss";
import { useState } from "react";
import axios from "axios";
import Media from "react-media";
import store from "../../redux/store";
import { toggleModalOn, toggleNavbar } from "../../redux/actions";

const Login = (props) => {
  const { setOpenLogin } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const successAlert = (token) => {
    sessionStorage.setItem("token", token);
    store.dispatch(
      toggleModalOn({
        toggleModal: true,
        redirect: "/profile",
        text: "Successfully logged in! Welcome!",
      })
    );
    store.dispatch(toggleNavbar(false));
    setOpenLogin(false);
  };

  const failedAlert = (alert) => {
    store.dispatch(
      toggleModalOn({
        toggleModal: true,
        redirect: "",
        text: alert,
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const login = {
      email,
      password,
    };
    try {
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
      <Media
        query='(max-width: 767px)'
        render={() => <h2 className='login__title'>Login</h2>}
      />
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
