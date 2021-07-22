import "./ProfileInfo.scss";
import avatar from "../../assets/Images/Mugshot-1.jpg";
import linkedin from "../../assets/Images/linkedin.png";
import octocat from "../../assets/Images/Octocat.png";
import gmail from "../../assets/Images/gmail.png";

const ProfileInfo = ({ user }) => {
  const { firstName, address, city, country, about, volunteer } = user;

  return (
    <div className='user-info'>
      <h2 className='user-info__name'>Welcome back {firstName}!</h2>
      <img src={avatar} alt='hey its me' className='user-info__avatar' />
      <h5 className='user-info__subtitle'>Address:</h5>
      <p className='user-info__details'>
        {address}, {city}, {country}
      </p>

      <h5 className='user-info__subtitle'>Interests:</h5>
      <p className='user-info__details'>{about}</p>
      <h5 className='user-info__subtitle'>Volunteer:</h5>
      <p className='user-info__details'>
        {volunteer ? "Available" : "Unavailable"}
      </p>
      <h5 className='user-info__subtitle'>Contact</h5>
      <div className='user-info__icon-container'>
        <img src={linkedin} alt='linkedin logo' className='user-info__logo' />
        <img src={octocat} alt='octocat-logo' className='user-info__logo' />
        <img src={gmail} alt='gmail-logo' className='user-info__logo' />
      </div>
    </div>
  );
};

export default ProfileInfo;
