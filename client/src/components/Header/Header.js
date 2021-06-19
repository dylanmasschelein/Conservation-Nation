import whereTo from "../../assets/Images/Where-to.png";
import { useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Login from "../Login/Login";
import logo from "../../assets/Images/logo.png";
import "./Header.scss";

const Header = ({ setRedirect, history, setToggleModal, setModalText }) => {
  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [animate, setAnimate] = useState(false);

  const profileNavigation = () => {
    if (typeof sessionStorage.getItem("token") !== "string") {
      setToggleModal(true);
      setOpenLogin(true);
      setModalText("Please login to continue");
    } else {
      history.push("/profile");
      setOpen(false);
    }
  };

  return (
    <div className='header'>
      <Link to='/' className='header__link'>
        <img src={logo} alt='Logo' className='header__logo' />
      </Link>
      {/* <Link to='/user/login' className='header__link'> */}
      <img
        src={whereTo}
        className='header__drop'
        onClick={() => {
          setOpen(!open);
        }}
      />
      {open && (
        <nav className={"dropdown dropdown--slidein"}>
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
              setToggleModal={setToggleModal}
              setModalText={setModalText}
              setRedirect={setRedirect}
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
