import React, { Component } from "react";
import axios from "axios";
import { MapContainer, GeoJSON, TileLayer, Marker, Popup } from "react-leaflet";
import "./AreaMap.scss";
// import areas from "../../data/singlearea.json";
import "leaflet/dist/leaflet.css";

class AreaMap extends Component {
  state = {
    coords: [],
  };

  getAreas() {
    axios.get("http://localhost:8080/area").then((response) => {
      const coords = response.data[0].geojson.geometry.coordinates;
      console.log(coords);
      this.setState({
        coords: coords,
      });
    });
  }

  componentDidMount() {
    this.getAreas();
  }

  render() {
    if (this.state.coords === []) {
      return <h1>Loading. . .</h1>;
    }
    return (
      <div>
        <h1>Map time</h1>
        <MapContainer className='map' zoom={2} center={(20, 100)}>
          <GeoJSON data={this.state.coords} />
        </MapContainer>
      </div>
    );
  }
}

export default AreaMap;
