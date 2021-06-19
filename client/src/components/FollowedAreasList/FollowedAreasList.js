import "./FollowedAreasList.scss";
import FollowedAreaCard from "../FollowedAreaCard/FollowedAreaCard";

const FollowedAreasList = ({ followedAreas }) => {
  return (
    <div className='area-list'>
      {followedAreas.map((area) => (
        <FollowedAreaCard
          key={area.id}
          name={area.name}
          country={area.countries[0].name}
        />
      ))}
    </div>
  );
};

export default FollowedAreasList;
