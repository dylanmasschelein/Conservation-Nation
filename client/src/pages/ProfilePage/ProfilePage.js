import { useState, useEffect } from "react";
import "./ProfilePage.scss";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import FollowedAreasList from "../../components/FollowedAreasList/FollowedAreasList";
import axios from "axios";

const ProfilePage = (props) => {
  const { setUser, user } = props;
  const [auth, setAuth] = useState(false);
  const [followedAreas, setFollowedAreas] = useState(null);
  const [followedAreasArr, setFollowedAreasArr] = useState(null);

  const getFollowedAreas = () => {
    axios
      .get(`http://localhost:8080/areas/area/following/${followedAreas}`)
      .then((areas) => setFollowedAreasArr(areas.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    console.log(token);
    if (!token) {
      setAuth(true);
    }

    axios
      .get("http://localhost:8080/user/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((user) => {
        setUser(user.data);
        setFollowedAreas(user.data.followedAreas);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    followedAreas && getFollowedAreas();
  }, [user, followedAreas]);

  // complete with logout

  return (
    <div>
      {user && <ProfileInfo user={user} />}
      {followedAreasArr && (
        <FollowedAreasList followedAreas={followedAreasArr} />
      )}
    </div>
  );
};

export default ProfilePage;
