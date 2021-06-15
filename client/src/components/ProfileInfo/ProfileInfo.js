const ProfileInfo = ({ user }) => {
  const { firstName, lastName, address, city, country, about, volunteer } =
    user;
  return (
    <div className='user-info'>
      <h2 className='user-info__name'>
        {firstName}, {lastName}
      </h2>
      <p className='user-info__details'>{address}</p>
      <p className='user-info__details'>
        {city}, {country}
      </p>
      <p className='user-info__details'>{about}</p>
      <p className='user-info__details'>
        Volunteer: {volunteer ? "Available" : "Unavailable"}
      </p>
    </div>
  );
};

export default ProfileInfo;
