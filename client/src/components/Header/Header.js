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
    </div>
  );
};

export default withRouter(Header);
