import "./Footer.scss";
import quote from "../../assets/Images/quote.png";

const Footer = () => {
  return (
    <div className='footer'>
      <img src={quote} alt='quote' className='footer__quote' />
    </div>
  );
};

export default Footer;
