import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Tooltip,
  Marker,
  useMapEvents,
  Popup,
  useMap,
} from "react-leaflet";
import "../AreaMap/AreaMap.scss";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const AreaMap = (props) => {
  const [areas, setAreas] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  // const [bounds, setBounds] = useState(null);
  const [naturalisData, setNaturalistData] = useState(null);
  const [areaBounds, setAreaBounds] = useState(null); // NE lat/lng , SW lat/lng format

  const map = useRef();
  const areaRef = useRef();

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation([latitude, longitude]);
    });
  };

  // I Recieve {_northEast {lat:lng}} and {_southWest {lat:lng}} from LatLngBounds -- Protected planet API
  // Will need to paginate or limit amount of markers in the area -- some return thousands
  const GetINaturalistData = () => {
    // https://api.inaturalist.org/v1/observations?geo=true&mappable=true&photos=true -- generic url to view response
    // `https://api.inaturalist.org/v1/observations?geo=true&mappable=true&photos=true&nelat=${neLat}&nelng=${neLng}&swlat=${swLat}&swlng=${swLng}`

    axios
      .get(
        `https://api.inaturalist.org/v1/observations?geo=true&mappable=true&photos=true&page=1&per_page=1`
      )
      .then((observations) => {
        const {
          observation_photos: photo, // Array
          introduced, // Boolean
          is_active: isActive, // Boolean
          name: latinName, // String
          native, // Boolean
          sounds, // ???????? Array
          observations_count: count, // String
          preferred_common_name: name, //String
          threatend, //Boolean
        } = observations.data.results[0].taxon;
        const { coordinates } = observations.data.results[0].geojson; // Array [lat, lng]
        console.log(observations.data.results[0]);
        setNaturalistData({
          photo,
          introduced,
          isActive,
          latinName,
          native,
          count,
          name,
          threatend,
          coordinates,
        });
      });
  };

  setTimeout(() => {
    // console.log(map.setView([-83.064, 5]));
  }, 1000);

  useEffect(() => {
    // GetINaturalistData();
    getAreas();
    getUserLocation();
  }, []);

  const onEachArea = (feature, layer) => {
    layer.on("click", (e) => {
      const { _northEast, _southWest } = e.target._bounds;
      console.log(
        areaRef.current._layers[2642]._map.touchZoom._map.ZoomBoundLayers
      );
      setAreaBounds({
        neLat: _northEast.lat,
        neLng: _northEast.lng,
        swLat: _southWest.lat,
        swLat: _southWest.lng,
      });
      console.log(feature);
    });
  };

  const getAreas = () => {
    axios.get("http://localhost:8080/areas/country").then((response) => {
      const areas = response.data;
      setAreas(areas);
    });
  };

  const marineStyle = {
    fillColor: "blue",
    weight: 2,
    color: "blue",
    fillOpacity: 0.3,
  };

  const landStyle = {
    fillColor: "green",
    weight: 2,
    color: "green",
    fillOpacity: 0.3,
  };

  if (areas === null) {
    return <h1>Loading. . .</h1>;
  }

  return (
    <div>
      <MapContainer
        className='map'
        center={userLocation}
        zoom={5}
        scrollWheelZoom={false}
        ref={map}
        whenCreated={(mapInstance) => {
          map.current = mapInstance;
        }}
      >
        {/* Map Styling */}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {/* Render polygons on map */}
        {areas.map((area) => {
          return (
            <GeoJSON
              onEachFeature={onEachArea}
              key={area.id}
              data={area.geojson}
              style={!area.marine ? landStyle : marineStyle}
              ref={areaRef}
              // eventHandlers={{
              //   click: zoomToArea,
              // }}
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
};

export default AreaMap;
