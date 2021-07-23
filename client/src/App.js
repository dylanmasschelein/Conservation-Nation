import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "./partials/_typography.scss";
import "./App.scss";
import Signup from "./components/Signup/Signup";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ModalWindow from "./components/ModalWindow/ModalWindow";
import Login from "./components/Login/Login";
import { useSelector } from "react-redux";

const App = () => {
  const modal = useSelector((state) => state.modal.toggleModal);
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Header user={user} />
      {modal && <ModalWindow />}
      <Switch>
        <Route path='/' exact render={() => <HomePage user={user} />} />
        <Route
          path='/profile'
          render={(routerProps) => (
            <ProfilePage setUser={setUser} user={user} {...routerProps} />
          )}
        />
        <Route
          path='/user/register'
          render={(routerProps) => <Signup {...routerProps} />}
        />
        <Route
          path='/user/login'
          render={(routerProps) => <Login {...routerProps} />}
        />
        <Redirect to='/' />
      </Switch>
    </Router>
  );
};

export default App;
