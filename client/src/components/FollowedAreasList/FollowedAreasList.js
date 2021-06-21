import "./FollowedAreasList.scss";
import FollowedAreaCard from "../FollowedAreaCard/FollowedAreaCard";

const FollowedAreasList = ({ followedAreas, handleDelete }) => {
  console.log(followedAreas);
  return (
    <div className='area-list'>
      {followedAreas.map((area) => (
        <FollowedAreaCard
          key={area.id}
          id={area.id}
          name={area.name}
          country={area.countries[0].name}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default FollowedAreasList;
