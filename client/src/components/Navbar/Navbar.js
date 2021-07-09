import { Link } from "react-router-dom";
import "./Navbar.scss";
import Login from "../Login/Login";

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to='/' className='navbar__link'>
        Home
      </Link>
      <Link to='/' className='navbar__link'>
        Login
      </Link>

      {/* <Login /> */}

      <Link className='navbar__link'>Profile</Link>
      <Link to='/user/register' className='navbar__link'>
        Register
      </Link>
    </nav>
  );
};

export default Navbar;
