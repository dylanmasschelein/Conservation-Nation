import { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "./App.scss";
// import AreaMap from "./components/AreaMap/AreaMap";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/user/register' component={Signup} />
          <Route path='/user/login' component={Login} />
          <Route path='/profile' component={ProfilePage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
