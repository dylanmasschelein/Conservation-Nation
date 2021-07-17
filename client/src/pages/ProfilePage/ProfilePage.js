import { useState, useEffect } from "react";
import "./ProfilePage.scss";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import FollowedAreasList from "../../components/FollowedAreasList/FollowedAreasList";
import axios from "axios";

const ProfilePage = (props) => {
  const { setUser, user, setToggleModal, setModalText, setRedirect } = props;
  const [failedAuth, setFailedAuth] = useState(false);
  const [followedAreas, setFollowedAreas] = useState(null);
  const token = sessionStorage.getItem("token");

  // Getting user data from database
  const getData = async (token) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const user = await axios.get("/user/current", headers);

      setUser(user.data);
      setFollowedAreas(user.data.followedAreas);
    } catch (err) {
      setFailedAuth(true);
    }
  };

  useEffect(() => {
    if (!token) {
      setFailedAuth(true);
    } else {
      getData(token);
    }
  }, [token]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    setFailedAuth(true);
    setToggleModal(true);
    setModalText("You have been logged out!");
    setRedirect("/");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/user/${user.email}/area/${id}`);
      getData(token);
    } catch (err) {
      console.error(err);
    }
  };

  if (failedAuth) {
    return <h1>You must be logged in to view your profile</h1>;
  }

  return (
    <div className='profile'>
      <div className='profile__user'>
        {user && <ProfileInfo user={user} />}
        <button onClick={handleLogout} className='profile__logout'>
          Log out
        </button>
      </div>
      <div className='profile__followed'>
        <h1 className='profile__title'>Followed areas</h1>
        <div className='profile__areas'>
          {followedAreas && (
            <FollowedAreasList
              handleDelete={handleDelete}
              followedAreas={followedAreas}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
