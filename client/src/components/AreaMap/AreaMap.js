import React, { Component } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./AreaMap.scss";
import axios from "axios";
import SinglePolygon from "../SinglePloygon/SinglePolygon";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

import { point, flip } from "@turf/turf";

class AreaMap extends Component {
  state = {
    areas: null,
  };

  paresGeojson(obj) {
    const coords = new L.GeoJSON(obj);
    return coords;
  }
  getAreaName = () => {
    console.log("click");
  };

  getAreas() {
    axios.get("http://localhost:8080/areas/country").then((response) => {
      const areas = response.data;
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
    return (
      <div>
        <MapContainer
          className='map'
          center={[49.127, -96.663]}
          zoom={5}
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
                positions={this.paresGeojson(area.geojson.geometry)}
                getAreaName={this.getAreaName}
              />
            );
          })}
        </MapContainer>
      </div>
    );
  }
}

export default AreaMap;
