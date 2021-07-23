import whereTo from "../../assets/Images/Where-to.png";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Login from "../Login/Login";
import logo from "../../assets/Images/conservation-nation-logo.png";
import "./Header.scss";
import Media from "react-media";
import Navbar from "../Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { toggleModalOn, toggleNavbar, toggleLogin } from "../../redux/actions";

const Header = ({ history }) => {
  const dispatch = useDispatch();
  const navbar = useSelector((state) => state.navbar);
  const login = useSelector((state) => state.login);

  const profileNavigation = () => {
    if (typeof sessionStorage.getItem("token") !== "string") {
      dispatch(
        toggleModalOn({
          toggleModal: true,
          redirect: "",
          text: "Please login to continue",
        })
      );
      dispatch(toggleLogin(true));
    } else {
      history.push("/profile");
      dispatch(toggleNavbar(false));
    }
  };

  return (
    <>
      <Media query='(max-width: 767px)' render={() => <Navbar />} />

      <Media
        query='(min-width: 768px)'
        render={() => (
          <div className='header'>
            <Link to='/' className='header__link'>
              <img src={logo} alt='Logo' className='header__logo' />
            </Link>

            <img
              src={whereTo}
              alt='Where to navigation text'
              className='header__drop'
              onClick={() => dispatch(toggleNavbar(!navbar))}
            />
            <nav
              className={
                navbar
                  ? "dropdown dropdown--slidein"
                  : "dropdown dropdown--slideout"
              }
            >
              <Link
                to='/'
                className='dropdown__link'
                onClick={() => dispatch(toggleNavbar(false))}
              >
                Home
              </Link>
              <Link
                to='/'
                onClick={() => dispatch(toggleLogin(!login))}
                className='dropdown__link'
              >
                Login
              </Link>
              {login && <Login />}
              <Link className='dropdown__link' onClick={profileNavigation}>
                Profile
              </Link>
              <Link
                to='/user/register'
                className='dropdown__link'
                onClick={() => dispatch(toggleNavbar(false))}
              >
                Register
              </Link>
            </nav>
          </div>
        )}
      />
    </>
  );
};

export default withRouter(Header);
