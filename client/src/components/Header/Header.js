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
}
