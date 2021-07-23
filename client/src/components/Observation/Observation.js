import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Observation.scss";
import { useDispatch } from "react-redux";
import { toggleModalOn, resetObservation } from "../../redux/actions";

const Observation = (props) => {
  const dispatch = useDispatch();
  // Protecting against observations that are null
  if (!props.observation.taxon) {
    dispatch(
      toggleModalOn({
        toggleModal: true,
        redirect: "",
        text: "Taxon information corrupt, please select another",
      })
    );
    dispatch(resetObservation(null));
    return null;
  }
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
      <FontAwesomeIcon
        icon={faTimes}
        onClick={() => dispatch(resetObservation(null))}
        className='observation__icon'
      />
      <div className='observation__photo-container'>
        {photo ? (
          <img src={photo} alt={name} className='observation__photo' />
        ) : (
          "Photo not available :("
        )}
      </div>
      <div className='observation__details-container'>
        <div className='observation__details'>
          <h1 className='observation__name'>{name}</h1>
          <h3 className='observation__latin-name'>{latinName}</h3>
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
            {!threatend ? "Healthy population" : "Threatend"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Observation;
