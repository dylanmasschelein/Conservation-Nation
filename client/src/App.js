import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "./partials/_typography.scss";
import "./App.scss";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ModalWindow from "./components/ModalWindow/ModalWindow";
import Footer from "./components/Footer/Footer";

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
      </Switch>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
