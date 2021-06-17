import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Tooltip,
  ZoomControl,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet-defaulticon-compatibility";
import "../AreaMap/AreaMap.scss";
import SpecificArea from "../../components/SpecificArea/SpecificArea";

const AreaMap = (props) => {
  const {
    areas,
    onEachArea,
    PlotObservations,
    setClickedArea,
    userLocation,
    center,
    observations,
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
        map.flyTo(e.latlng, 9);
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
                  console.log(area);
                },
              }}
            >
              {!observations && (
                <Tooltip className='tooltips' sticky>
                  <SpecificArea area={area} />
                </Tooltip>
              )}
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

  return (
    <div>
      <MapContainer
        className='map'
        center={[52, -122]}
        zoom={2}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <ZoomControl position='bottomright' />
        {!observations && center ? <CenterMap center={center} /> : null}
        {observations && <PlotObservations />}
        <TileLayer
          attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg'
          // attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
          // url='https://api.mapbox.com/styles/v1/dylanmasschelein/ckpyx7zjx4dga18nwl5c9fwwb/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZHlsYW5tYXNzY2hlbGVpbiIsImEiOiJja3B5dmlyZXUwaG55Mm9xc3RsNzBybWV2In0.NJDvx0UbxYYMpvuQsamo6w'
        />
        {areas && <AreaPolygons />}
      </MapContainer>
    </div>
  );
};

export default AreaMap;
