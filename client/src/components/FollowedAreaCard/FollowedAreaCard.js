import React from "react";
import "./FollowedAreaCard.scss";

const FollowedAreaCard = ({ name, country }) => {
  return (
    <div>
      <h2>{name}</h2>
      <h3>{country}</h3>
    </div>
  );
};
export default FollowedAreaCard;
