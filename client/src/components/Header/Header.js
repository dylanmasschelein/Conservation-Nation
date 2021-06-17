import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Login from "../Login/Login";
import ConservationNation from "../../assets/Images/Conservation-nation.png";
import "./Header.scss";

const Header = ({ history, user }) => {
  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const profileNavigation = () => {
    if (typeof sessionStorage.getItem("token") !== "string") {
      alert("Please login or register to continue to profile");
      setOpenLogin(true);
    } else {
      history.push("/profile");
    }
  };

  return (
    <div className='header'>
      <Link to='/'>
        <img src={ConservationNation} alt='Logo' className='header__logo' />
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
          <Link className='dropdown__link' onClick={profileNavigation}>
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

      <div class='custom-shape-divider-top-1623907872'>
        <svg
          data-name='Layer 1'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1200 120'
          preserveAspectRatio='none'
        >
          <path
            d='M602.45,3.86h0S572.9,116.24,281.94,120H923C632,116.24,602.45,3.86,602.45,3.86Z'
            class='shape-fill'
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default withRouter(Header);
