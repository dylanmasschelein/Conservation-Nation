import "./ProfileInfo.scss";

const ProfileInfo = ({ user }) => {
  const { firstName, address, city, country, about, volunteer, avatar } = user;
  console.log(avatar);

  return (
    <div className='user-info'>
      <h2 className='user-info__name'>Welcome back {firstName}!</h2>
      <p className='user-info__details'>
        <h5 className='user-info__subtitle'>Address:</h5>
        {address}, {city}, {country}
      </p>

      <p className='user-info__details'>
        <h5 className='user-info__subtitle'>Interests:</h5>
        {about}
      </p>
      <p className='user-info__details'>
        <h5 className='user-info__subtitle'>Volunteer:</h5>
        {volunteer ? "Available" : "Unavailable"}
      </p>
      <img src={avatar} alt='hey its me' />
    </div>
  );
};

export default ProfileInfo;
