import React from "react";
import "./Observation.scss";

export default function Observation(props) {
  const { medium_url: photo } = props.observation.taxon.default_photo;
  const {
    name: latinName,
    is_active: isActive,
    observations_count: count,
    preferred_common_name: name,
    threatend,
    native,
  } = props.observation.taxon;

  return (
    <div className='observation'>
      {photo ? <img src={photo} alt={name} /> : "Photo not available :("}
      <div className='observation__details'>
        <h1 className='observation__name'>Name: {name}</h1>
        <h3 className='observation_latin-name'>Latin name: {latinName}</h3>
        <span className='observation__info'>
          {native ? "Native wildlife" : "Introduced wildlife"}
        </span>
        <span className='observation__info'>
          Observed population count: {count}
        </span>
        <span className='observation__info'>
          Currently Active: {isActive ? "Yes" : "No"}
        </span>
        <span className='observation__info'>
          Status: {threatend ? "Yes" : "No"}
        </span>
      </div>
    </div>
  );
}
