import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "./App.scss";
// import AreaMap from "./components/AreaMap/AreaMap";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

const App = (props) => {
  const [user, setUser] = useState(null);
  console.log(props);
  return (
    <Router>
      <Header user={user} />
      <Switch>
        <Route path='/' exact render={() => <HomePage user={user} />} />
        <Route path='/user/register' component={Signup} />
        <Route path='/user/login' component={Login} />
        <Route
          path='/profile'
          render={(routerProps) => (
            <ProfilePage setUser={setUser} user={user} {...routerProps} />
          )}
        />
      </Switch>
    </Router>
  );
};

export default App;
