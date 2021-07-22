import whereTo from "../../assets/Images/Where-to.png";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Login from "../Login/Login";
import logo from "../../assets/Images/conservation-nation-logo.png";
import "./Header.scss";
import Media from "react-media";
import Navbar from "../Navbar/Navbar";
import store from "../../redux/store";
import { toggleModalOn } from "../../redux/actions";

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
      store.dispatch(
        toggleModalOn({
          toggleModal: true,
          redirect: "",
          text: "Please login to continue",
        })
      );
      setOpenLogin(true);
    } else {
      history.push("/profile");
      setOpen(false);
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
              onClick={() => {
                setOpen(!open);
              }}
            />
            <nav
              className={
                open
                  ? "dropdown dropdown--slidein"
                  : "dropdown dropdown--slideout"
              }
            >
              <Link
                to='/'
                className='dropdown__link'
                onClick={() => setOpen(false)}
              >
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
        )}
      />
    </>
  );
};

export default withRouter(Header);
