import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Header.scss";

export default function Header() {
  return (
    <div className='header'>
      <Link to='/'>
        <img src='dweqd' alt='Logo' className='header__logo' />
      </Link>
      <Link to='/user/login' className='header__link'>
        <FontAwesomeIcon icon={faGlobeAmericas} className='header__drop' />
      </Link>
    </div>
  );
}
