import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "./App.scss";
// import AreaMap from "./components/AreaMap/AreaMap";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/' exact render={() => <HomePage user={user} />} />
        <Route path='/user/register' component={Signup} />
        <Route path='/user/login' component={Login} />
        <Route
          path='/profile'
          render={() => <ProfilePage setUser={setUser} user={user} />}
        />
      </Switch>
    </Router>
  );
};

export default App;
