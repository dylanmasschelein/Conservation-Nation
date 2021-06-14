import React from "react";
import "./Observation.scss";
export default function Observation() {
  return (
    <div className='observation'>
      {/* map over all found photos and implement scroll feature? */}
      <img src='wqed' alt='Observation photo' className='observation__photo' />
      <div className='observation__details'>
        <h1 className='observation__name'>name</h1>
        <h3 className='observation_latin-name'>latinName</h3>
        <span className='observation__info'>native or introduced</span>
        <span className='observation__info'>count</span>
        <span className='observation__info'>isActive</span>
        <span className='observation__info'>threatend</span>
        <span className='observation__info'>coordinates</span>
      </div>
    </div>
  );
}
