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

const App = () => {
  const [user, setUser] = useState(null);
  const [toggleModal, setToggleModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [redirect, setRedirect] = useState("");
  return (
    <Router>
      <Header
        user={user}
        setToggleModal={setToggleModal}
        setModalText={setModalText}
        setRedirect={setRedirect}
      />
      {toggleModal && (
        <ModalWindow
          redirect={redirect}
          setToggleModal={setToggleModal}
          modalText={modalText}
        />
      )}
      <Switch>
        <Route
          path='/'
          exact
          render={() => (
            <HomePage
              user={user}
              setToggleModal={setToggleModal}
              setModalText={setModalText}
              setRedirect={setRedirect}
            />
          )}
        />
        <Route
          path='/profile'
          render={(routerProps) => (
            <ProfilePage
              setUser={setUser}
              user={user}
              setToggleModal={setToggleModal}
              setModalText={setModalText}
              setRedirect={setRedirect}
              {...routerProps}
            />
          )}
        />
        <Route
          path='/user/register'
          render={(routerProps) => (
            <Signup
              setToggleModal={setToggleModal}
              setModalText={setModalText}
              setRedirect={setRedirect}
              {...routerProps}
            />
          )}
        />
        <Redirect path='/' />{" "}
      </Switch>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
