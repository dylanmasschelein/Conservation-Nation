import "./InteractiveMap.scss";
import { Map, GoogleApiWrapper, Marker, Polygon } from "google-maps-react";
import { Component } from "react";
import axios from "axios";

class InteractiveMap extends Component {
  state = {
    coords: [
      { lat: 25.774, lng: -80.19 },
      { lat: 18.466, lng: -66.118 },
      { lat: 32.321, lng: -64.757 },
      { lat: 25.774, lng: -80.19 },
    ],
  };
  // getAreas() {
  //   axios.get("http://localhost:8080/area").then((response) => {
  //     const coords = response.data[0].geojson.geometry.coordinates[0];
  //     this.setState({
  //       coords: coords,
  //     });
  //   });
  // }

  // componentDidMount() {
  //   this.getAreas();
  // }

  render() {
    if (this.state.coords === []) {
      return <h1>Loading. . .</h1>;
    }
    return (
      <div className='map'>
        <Map
          google={this.props.google}
          zoom={8}
          initialCenter={{ lat: 47.444, lng: -122.176 }}
        >
          <Polygon
            path={this.state.coords}
            // key={1}
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#FF0000",
              fillOpacity: 0.35,
            }}
            onClick={() => {
              console.log("Hey There!!");
            }}
          />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
})(InteractiveMap);

// state = {
//   stores: [
//     { lat: 47.49855629475769, lng: -122.14184416996333 },
//     { latitude: 47.359423, longitude: -122.021071 },
//     { latitude: 47.2052192687988, longitude: -121.988426208496 },
//     { latitude: 47.6307081, longitude: -122.1434325 },
//     { latitude: 47.3084488, longitude: -122.2140121 },
//     { latitude: 47.5524695, longitude: -122.0425407 },
//   ],
// };

// displayMarkers = () => {
//   return this.state.stores.map((store, index) => {
//     return (
//       <Marker
//         key={index}
//         id={index}
//         position={{
//           lat: store.latitude,
//           lng: store.longitude,
//         }}
//         onClick={() => console.log("You clicked me!")}
//       />
//     );
//   });
// };
