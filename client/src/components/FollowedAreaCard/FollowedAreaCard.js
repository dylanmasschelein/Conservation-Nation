import React from "react";
import "./FollowedAreaCard.scss";

const FollowedAreaCard = ({ name, country }) => {
  return (
    <div className='area-card'>
      <h2 className='area-card__name'>{name}</h2>
      <h3 className='area-card__country'>{country}</h3>
    </div>
  );
};
export default FollowedAreaCard;
