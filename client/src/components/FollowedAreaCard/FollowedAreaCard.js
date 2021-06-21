import { Link } from "react-router-dom";
import "./FollowedAreaCard.scss";

const FollowedAreaCard = ({ name, country, id, handleDelete }) => {
  return (
    <Link className='area-card'>
      <h2 className='area-card__name'>{name}</h2>
      <h3 className='area-card__country'>{country}</h3>
      <button onClick={() => handleDelete(id)}>UNFOLLOW</button>
    </Link>
  );
};
export default FollowedAreaCard;
