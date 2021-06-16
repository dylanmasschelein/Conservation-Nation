import "./Signup.scss";
import { Component } from "react";
import axios from "axios";

class Signup extends Component {
  state = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    about: "",
    volunteer: true,
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
    alert("Signup Successful!");
    this.props.history.push("/user/login");
  };

  failedAlert = () => {
    alert("Please fill out all required fields");
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/user/register`, {
        username: this.state.username,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        city: this.state.city,
        country: this.state.country,
        volunteer: this.state.volunteer,
        about: this.state.about,
      })
      .then((res) => {
        res.data.status === "ok" ? this.successAlert() : this.failedAlert();
      })
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='signup'>
        <div className='signup__left'>
          <label htmlFor='firstName' className='signup__label'>
            First name
            <input
              type='text'
              name='firstName'
              value={this.state.firstName}
              onChange={this.handleChange}
              className='signup__input'
            ></input>
          </label>
          <label htmlFor='lastName' className='signup__label'>
            Last Name
            <input
              type='text'
              name='lastName'
              value={this.state.lastName}
              onChange={this.handleChange}
              className='signup__input'
            ></input>
          </label>
          <label htmlFor='address' className='signup__label'>
            Address
            <input
              type='text'
              name='address'
              value={this.state.address}
              onChange={this.handleChange}
              className='signup__input'
            ></input>
          </label>
          <label htmlFor='city' className='signup__label'>
            City
            <input
              type='text'
              name='city'
              value={this.state.city}
              onChange={this.handleChange}
              className='signup__input'
            ></input>
          </label>
          <label htmlFor='country' className='signup__label'>
            Country
            <input
              type='text'
              name='country'
              value={this.state.country}
              onChange={this.handleChange}
              className='signup__input'
            ></input>
          </label>
        </div>
        <div className='signup__right'>
          <label htmlFor='about' className='signup__label'>
            About you...
            <input
              type='text'
              name='about'
              value={this.state.about}
              onChange={this.handleChange}
              className='signup__input signup__input--about'
            ></input>
          </label>
          <label htmlFor='volunteer' className='signup__label'>
            Avaliable to volunteer?
            <input
              type='radio'
              name='volunteer'
              value={this.state.volunteer}
              onChange={this.handleChange}
              className='signup__input'
            ></input>
          </label>
          <label htmlFor='email' className='signup__label'>
            Email
            <input
              type='username'
              name='username'
              value={this.state.username}
              onChange={this.handleChange}
              className='signup__input'
            ></input>
          </label>
          <label htmlFor='password' className='signup__label'>
            Password
            <input
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
              className='signup__input'
            ></input>
            {/* Open to volunteer */}
          </label>

          <button type='submit' className='signup__submit'>
            Sign Up
          </button>
        </div>
      </form>
    );
  }
}

export default Signup;
