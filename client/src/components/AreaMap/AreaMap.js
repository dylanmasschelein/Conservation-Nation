import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Tooltip,
  Rectangle,
  useMap,
  useMapEvents,
  Marker,
  Popup,
  // useMap,
} from "react-leaflet";
import "../AreaMap/AreaMap.scss";
import axios from "axios";

const AreaMap = (props) => {
  const {
    areas,
    onEachArea,
    PlotObservations,
    setClickedArea,
    userLocation,
    center,
  } = props;

  useEffect(() => {}, [areas, userLocation]);

  const CenterMap = (center) => {
    const map = useMap();
    map.flyTo(center.center, 6);
    return null;
  };
  // Plotting designated areas on map
  const AreaPolygons = () => {
    const map = useMapEvents({
      click: (e) => {
        map.setView(e.latlng, 9);
      },
    });

    return (
      <>
        {areas.map((area) => {
          return (
            <GeoJSON
              onEachFeature={onEachArea}
              key={area._id}
              data={area.geojson}
              style={!area.marine ? landStyle : marineStyle}
              eventHandlers={{
                click: () => {
                  setClickedArea(area);
                },
              }}
            >
              <Tooltip sticky>
                {area.name}, {area.countries[0].name}
              </Tooltip>
            </GeoJSON>
          );
        })}
      </>
    );
  };

  // Area styles based on land or marine
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
  if (!areas) {
    return (
      <MapContainer
        className='map'
        center={[52, -112]}
        zoom={5}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
      </MapContainer>
    );
  }

  return (
    <div>
      <MapContainer
        className='map'
        center={[52, -122]}
        zoom={5}
        scrollWheelZoom={false}
      >
        {center && <CenterMap center={center} />}
        <PlotObservations />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <AreaPolygons />
      </MapContainer>
    </div>
  );
};

export default AreaMap;
