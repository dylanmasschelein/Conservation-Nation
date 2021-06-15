import { useState, useEffect } from "react";
import "./ProfilePage.scss";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import FollowedAreas from "../../components/FollowedAreas/FollowedAreas";
import axios from "axios";

const ProfilePage = (props) => {
  const { setUser, user } = props;
  const [auth, setAuth] = useState(false);

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
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {}, [user]);

  // complete with logout

  return (
    <div>
      {user && <ProfileInfo user={user} />}
      <FollowedAreas />
    </div>
  );
};

export default ProfilePage;
