import React, { Component } from "react";
import { MapContainer, TileLayer, GeoJSON, Tooltip } from "react-leaflet";
import "./AreaMap.scss";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

class AreaMap extends Component {
  state = {
    areas: null,
    lng: null,
    lat: null,
    bounds: null,
    naturalistData: null,
  };

  GetINaturalistData = () => {
    axios
      .get(
        `https://api.inaturalist.org/v1/observations?geo=true&mappable=true&photos=true&per_page=1`
      )
      .then((data) => {
        console.log(data.data);
      });
  };

  onEachArea = (feature, layer) => {
    //in this function I will set the layer.options.fillColor
    // layer.options.fillColor = feature.properties.fill; Gives me ability to access polygon coords and properties -- HUGE

    layer.on("click", (e) => {
      const { coordinates } = feature.geometry;
      const areaBounds = L.latLngBounds(coordinates);
      // L.fitBounds(areaBounds);
      console.log(areaBounds);
      console.log(MapContainer);
      // feature.fitBounds(areaBounds);
      console.log(layer); // layer also exists
      console.log(feature); // layer also exists
    });
  };
  // onEachArea = (name, country) => {
  //   const area = `${name}, ${country}`;
  // };

  zoomToArea = (e) => {
    console.log(e.target);
  };

  getAreas() {
    axios.get("http://localhost:8080/areas/country").then((response) => {
      const areas = response.data;
      this.setState({
        areas: areas,
      });
    });
  }
  // Add to helper function folder

  // think the object options are overiding this option?
  fillColor(option) {
    console.log(option, "optioning");

    if (option === true) {
      console.log("if");
      return {
        fillOpacity: 0.5,
        fillColor: "blue",
        color: "blue",
        markerStroke: "blue",
        marker: "blue",
        opacity: 0.4,
      };
    } else if (option === false) {
      console.log("else if");
      return {
        fillColor: "green",
        color: "green",
        marker: "green",
        markerStroke: "green",
        fillOpacity: 0.5,
      };
    } else {
      console.log("else");
      return {
        fillColor: "green",
        color: "green",
        stroke: "green",
        markerStroke: "green",
        fillOpacity: 0.4,
      };
    }
  }

  componentDidMount() {
    this.GetINaturalistData();
    this.getAreas();
    this.getUserLocation();
  }

  getUserLocation = () => {
    console.log("Im working");
    navigator.geolocation.getCurrentPosition(this.centerLocationOnUser);
  };

  centerLocationOnUser = (position) => {
    const { latitude, longitude } = position.coords;
    const bounds = L.latLngBounds([latitude, longitude]);
    this.setState({
      lng: longitude,
      lat: latitude,
      bounds: bounds,
    });
  };

  render() {
    if (this.state.areas === null) {
      return <h1>Loading. . .</h1>;
    }
    const mapStyle = {
      fillColor: "green",
      weight: 1,
      color: "black",
      fillOpacity: 0.3,
    };

    return (
      <div>
        <MapContainer
          className='map'
          center={[this.state.lat, this.state.lng]}
          zoom={5}
          bounds={this.state.bounds}
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
              <GeoJSON
                style={mapStyle}
                onEachFeature={this.onEachArea}
                key={area.id}
                data={area.geojson}
              >
                <Tooltip sticky>
                  {area.name}, {area.countries[0].name}
                </Tooltip>
              </GeoJSON>
            );
          })}
        </MapContainer>
      </div>
    );
  }
}

export default AreaMap;
