import React, { Component } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./AreaMap.scss";
import axios from "axios";
import SinglePolygon from "../SinglePloygon/SinglePolygon";
import "leaflet/dist/leaflet.css";

class AreaMap extends Component {
  state = {
    areas: null,
  };
  getAreas() {
    axios.get("http://localhost:8080/area").then((response) => {
      const areas = response.data;
      console.log(areas);
      this.setState({
        areas: areas,
      });
    });
  }

  componentDidMount() {
    this.getAreas();
  }
  render() {
    if (this.state.areas === null) {
      return <h1>Loading. . .</h1>;
    }
    const fillBlueOptions = { fillColor: "blue" };
    // const limeOptions = { color: "lime" };
    return (
      <div>
        <MapContainer
          className='map'
          center={[9.714, 4.859]}
          zoom={13}
          scrollWheelZoom={false}
        >
          {/* Map Styling */}
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {/* Render polygons on map */}
          {this.state.areas.map((area) => {
            return (
              <SinglePolygon
                key={area.id}
                pathOptions={fillBlueOptions}
                positions={area.geojson.geometry.coordinates}
              />
            );
          })}
        </MapContainer>
      </div>
    );
  }
}

export default AreaMap;
