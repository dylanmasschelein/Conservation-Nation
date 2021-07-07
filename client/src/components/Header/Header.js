import whereTo from "../../assets/Images/Where-to.png";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Login from "../Login/Login";
import logo from "../../assets/Images/conservation-nation-logo.png";
import "./Header.scss";

const Header = (props) => {
  const {
    setRedirect,
    history,
    setToggleModal,
    setModalText,
    open,
    setOpen,
    openLogin,
    setOpenLogin,
  } = props;

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
      <img
        src={whereTo}
        alt='Where to navigation text'
        className='header__drop'
        onClick={() => {
          setOpen(!open);
        }}
      />
      <nav
        className={
          open ? "dropdown dropdown--slidein" : "dropdown dropdown--slideout"
        }
      >
        <Link to='/' className='dropdown__link' onClick={() => setOpen(false)}>
          Home
        </Link>
        <Link
          to='/'
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
    </div>
  );
};

export default withRouter(Header);
