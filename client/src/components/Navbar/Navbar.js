import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to='/' className='navbar__link'>
        Home
      </Link>
      <Link to='/user/login' className='navbar__link'>
        Login
      </Link>

      <Link to='/profile' className='navbar__link'>
        Profile
      </Link>
      <Link to='/user/register' className='navbar__link'>
        Register
      </Link>
    </nav>
  );
};

export default Navbar;
