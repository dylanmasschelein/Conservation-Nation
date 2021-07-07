import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import "./FollowedAreaCard.scss";

const FollowedAreaCard = ({ name, country, id, handleDelete }) => {
  return (
    <Link className='area-card'>
      <h2 className='area-card__name'>{name}</h2>
      <h3 className='area-card__country'>{country}</h3>
      <FontAwesomeIcon
        icon={faTimesCircle}
        onClick={() => handleDelete(id)}
        className='area-card__unfollow'
      />
    </Link>
  );
};
export default FollowedAreaCard;
