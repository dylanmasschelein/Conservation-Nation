import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const ProfileInfo = ({ user, editProfileInfo, handleEdit }) => {
  const { firstName, address, city, country, about, volunteer } = user;
  const [editAddress, setEditAddress] = useState(false);
  const [editCity, setEditCity] = useState(false);
  const [editCountry, setEditCountry] = useState(false);
  const [editAbout, setEditAbout] = useState(false);
  const [editVolunteer, setEditVolunteer] = useState(false);

  return (
    <div className='user-info'>
      <h2 className='user-info__name'>Welcome back {firstName}!</h2>
      <p className='user-info__details'>
        {address}
        <FontAwesomeIcon
          onClick={() => setEditAddress(!editAddress)}
          className='user-info__edit'
          icon={faEdit}
        />
        {editAddress && handleEdit()}
      </p>
      <p className='user-info__details'>
        {city},
        <FontAwesomeIcon
          onClick={() => setEditCity(!editCity)}
          className='user-info__edit'
          icon={faEdit}
        />
        {editCity && handleEdit()}
      </p>
      <p className='user-info__details'>
        {country}
        <FontAwesomeIcon
          onClick={() => setEditCountry(!editCountry)}
          className='user-info__edit'
          icon={faEdit}
        />
        {editCountry && handleEdit()}
      </p>
      <p className='user-info__details'>
        Interests: {about}
        <FontAwesomeIcon
          onClick={() => setEditAbout(!editAbout)}
          className='user-info__edit'
          icon={faEdit}
        />
        {editAbout && handleEdit()}
      </p>
      <p className='user-info__details'>
        Volunteer: {volunteer ? "Available" : "Unavailable"}
        <FontAwesomeIcon
          onClick={() => setEditVolunteer(!editVolunteer)}
          className='user-info__edit'
          icon={faEdit}
        />
        {editVolunteer && handleEdit()}
      </p>
    </div>
  );
};

export default ProfileInfo;
