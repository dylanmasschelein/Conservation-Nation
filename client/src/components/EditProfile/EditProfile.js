import "./Login.scss";
import { Component } from "react";
import axios from "axios";
import "./EditProfile.scss";

class EditProfile extends Component {
  state = {
    newPassword: "",
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("hit me");
    axios
      .post(`http://localhost:8080/user/change-password`, {
        newPassowrd: this.state.newPassword,
        token: localStorage.getItem(token),
      })
      .then((res) => {
        console.log("hit meeeee");
        alert("Success");
        console.log(res.data, "got the token");
      })
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='password'>
          Password
          <input
            type='password'
            placeholder='Enter your password'
            name='password'
            value={this.state.newPassword}
            onChange={this.handleChange}
          ></input>
        </label>
        <button type='submit'>Login</button>
      </form>
    );
  }
}

export default EditProfile;
