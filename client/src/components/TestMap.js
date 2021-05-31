import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import "./TestMap.scss";
import axios from "axios";
export default class TestMap extends Component {
  state = {
    coords: null,
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
    if (this.state.coords === null) {
      return <h1>Loading. . .</h1>;
    }
    const fillBlueOptions = { fillColor: "blue" };
    const limeOptions = { color: "lime" };
    return (
      <div>
        <MapContainer
          className='map'
          center={[-3.965, 35.245]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {/* <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker> */}
          <Polygon
            pathOptions={fillBlueOptions}
            positions={this.state.coords}
          />
        </MapContainer>
      </div>
    );
  }
}
