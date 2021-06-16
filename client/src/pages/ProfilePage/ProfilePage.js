import { useState, useEffect } from "react";
import "./ProfilePage.scss";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import FollowedAreasList from "../../components/FollowedAreasList/FollowedAreasList";
import axios from "axios";

const ProfilePage = (props) => {
  const { setUser, user } = props;
  const [failedAuth, setFailedAuth] = useState(false);
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

    if (!token) {
      setFailedAuth(true);
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
      .catch(() => setFailedAuth(true));
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    setFailedAuth(true);
    alert("You've been logged out!");
    props.history.push("/");
  };

  useEffect(() => {
    followedAreas && getFollowedAreas();
  }, [user, followedAreas]);

  {
    !failedAuth && <h1>You must be logged in to view your profile</h1>;
  }

  return (
    <div>
      {user && <ProfileInfo user={user} />}
      {followedAreasArr && (
        <FollowedAreasList followedAreas={followedAreasArr} />
      )}
      <button onClick={handleLogout} className='logout'>
        Log out
      </button>
    </div>
  );
};

export default ProfilePage;
