import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Login from "../Login/Login";
import "./Header.scss";

const Header = ({ history, user }) => {
  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const alertSignIn = () => {
    alert("Please login to continue to profile");
    // setOpen(true);
  };

  return (
    <div className='header'>
      <Link to='/'>
        <img src='dweqd' alt='Logo' className='header__logo' />
      </Link>
      {/* <Link to='/user/login' className='header__link'> */}
      <FontAwesomeIcon
        icon={faGlobeAmericas}
        className='header__drop'
        onClick={() => setOpen(!open)}
      />
      {open && (
        <nav className='dropdown'>
          <Link
            to='/'
            className='dropdown__link'
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            onClick={() => setOpenLogin(!openLogin)}
            className='dropdown__link'
          >
            Login
          </Link>
          {openLogin && (
            <Login
              history={history}
              setOpen={setOpen}
              setOpenLogin={setOpenLogin}
            />
          )}
          <Link
            to='/profile'
            className='dropdown__link'
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>
          <Link
            to='/user/register'
            className='dropdown__link'
            onClick={() => setOpen(false)}
          >
            Register
          </Link>
        </nav>
      )}

      {/* <div class='custom-shape-divider-top-1623857236'>
        <svg
          data-name='Layer 1'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1200 120'
          preserveAspectRatio='none'
        >
          <path
            d='M1200 120L0 16.48 0 0 1200 0 1200 120z'
            class='shape-fill'
          ></path>
        </svg> */}
      {/* </div> */}
    </div>
  );
};

export default withRouter(Header);
