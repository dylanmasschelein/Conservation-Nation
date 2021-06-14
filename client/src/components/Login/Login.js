import "./Login.scss";
import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  successAlert = () => {
    alert("Successfully logged in!");
    this.props.history.push("/profile");
  };

  failedAlert = () => {
    alert("Please enter valid username/password");
  };
  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/user/login`, {
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) => {
        console.log(res);

        res.data.status === "ok" ? this.successAlert() : this.failedAlert();
        localStorage.setItem("token", res.data);
      })
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <div className='login'>
        <form onSubmit={this.handleSubmit} className='login__form'>
          <label htmlFor='email' className='login__label'>
            Username
            <input
              type='username'
              name='username'
              value={this.state.username}
              onChange={this.handleChange}
              className='login__input'
            ></input>
          </label>
          <label htmlFor='password' className='login__label'>
            Password
            <input
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
              className='login__input'
            ></input>
          </label>
          {/* do i need a link here?? */}
          <button type='submit' className='login__submit'>
            Login
          </button>
        </form>
        <div className='login__signup'>
          <span className='login__prompt'>Don't have an account yet?</span>
          <Link to='/user/register' className='login__signup-link'>
            Signup here!
          </Link>
        </div>
      </div>
    );
  }
}

export default Login;
