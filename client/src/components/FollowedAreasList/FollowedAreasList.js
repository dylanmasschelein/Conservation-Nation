import "./FollowedAreasList.scss";
import FollowedAreaCard from "../FollowedAreaCard/FollowedAreaCard";

const FollowedAreasList = ({ followedAreas }) => {
  return (
    <div>
      <h1>Followed areas</h1>
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
