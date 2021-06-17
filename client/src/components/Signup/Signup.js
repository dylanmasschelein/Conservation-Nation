import "./Signup.scss";
import axios from "axios";
import { useState } from "react";

const Signup = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [about, setAbout] = useState("");
  const [volunteer, setVolunteer] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const successAlert = () => {
    alert("Signup Successful!");
    props.history.push("/user/login");
  };

  const failedAlert = () => {
    alert("Please fill out all required fields");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/user/register`, {
        firstName,
        lastName,
        address,
        city,
        country,
        volunteer,
        about,
        email,
        password,
        confirmPassword,
      })
      .then((res) => {
        res.data.status === "ok" ? successAlert() : failedAlert();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className='signup'>
      <h2 className='signup__name'>Register here!</h2>
      <form onSubmit={handleSubmit} className='signup__form'>
        <div className='signup__left'>
          <label htmlFor='firstName' className='signup__label'>
            First name
            <input
              type='text'
              name='firstName'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className='signup__input'
            ></input>
          </label>
          <label htmlFor='lastName' className='signup__label'>
            Last Name
            <input
              type='text'
              name='lastName'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className='signup__input'
            ></input>
          </label>
          <label htmlFor='address' className='signup__label'>
            Address
            <input
              type='text'
              name='address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className='signup__input'
            ></input>
          </label>
          <label htmlFor='city' className='signup__label'>
            City
            <input
              type='text'
              name='city'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className='signup__input'
            ></input>
          </label>
          <label htmlFor='country' className='signup__label'>
            Country
            <input
              type='text'
              name='country'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
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
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className='signup__input signup__input--about'
            ></input>
          </label>

          <label
            htmlFor='volunteer'
            className='signup__label signup__label--radio'
          >
            Avaliable to volunteer?
          </label>
          <div className='signup__radio'>
            <label>
              <input
                type='radio'
                name='volunteer'
                value={true}
                onChange={(e) => setVolunteer(e.target.value)}
              ></input>
              Yes
            </label>
            <label>
              <input
                type='radio'
                name='volunteer'
                value={false}
                onChange={(e) => setVolunteer(e.target.value)}
              ></input>
              No
            </label>
          </div>

          <label htmlFor='email' className='signup__label'>
            Email
            <input
              type='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='signup__input'
            ></input>
          </label>
          <label htmlFor='password' className='signup__label'>
            Password
            <input
              type='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='signup__input'
            ></input>
          </label>
          <label htmlFor='password' className='signup__label'>
            Confirm Password
            <input
              type='password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='signup__input'
            ></input>
          </label>

          <button type='submit' className='signup__submit'>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
