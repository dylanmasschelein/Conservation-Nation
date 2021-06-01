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

  getAreaName = (e) => {
    console.log(e);
  };

  getAreas() {
    axios
      .get(
        "http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=6&token=1c80aeb620a008918c33c3575aed4236"
      )
      .then((response) => {
        const areas = response.data.protected_areas;
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
          center={[19.234, 52.266]}
          zoom={13}
          scrollWheelZoom={false}
        >
          {/* Map Styling */}
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {/* Render polygons on map */}
          {this.state.areas.map((area, i) => {
            console.log(i);
            return (
              <SinglePolygon
                key={area.id}
                pathOptions={fillBlueOptions}
                positions={area.geojson.geometry.coordinates}
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
