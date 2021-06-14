import { Component } from "react";
import "./HomePage.scss";
import AreaMap from "../../components/AreaMap/AreaMap";
import SearchBar from "../../components/SearchBar/SearchBar";
import Observation from "../../components/Observation/Observation";
import SpecificArea from "../../components/SpecificArea/SpecificArea";
import axios from "axios";

class HomePage extends Component {
  state = {
    search: "",
    areas: null,
    clickedObservation: "",
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSearch = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:8080/areas/country/${this.state.search}`)
      .then((areas) => {
        console.log("submitted");
        this.setState({ areas: areas.data });
        console.log(this.state.search);
      })
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <div className='home'>
        <div className='home__left'>
          <SearchBar
            handleChange={this.handleChange}
            handleSearch={this.handleSearch}
            searchValue={this.state.search}
          />
          <Observation />
        </div>
        <div className='home__right'>
          <AreaMap areas={this.state.areas} />
          <SpecificArea />
        </div>
      </div>
    );
  }
}

export default HomePage;
