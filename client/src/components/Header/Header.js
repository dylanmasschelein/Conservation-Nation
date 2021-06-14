import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
export default function Header() {
  return (
    <div className='header'>
      <img src='dweqd' alt='Logo' className='header__logo' />
      <Link to='/user/login' className='header__link'>
        <button className='header__link--btn'>Login</button>
      </Link>
    </div>
  );
}
