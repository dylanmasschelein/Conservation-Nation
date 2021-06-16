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
                  {/* {area.name}, {area.countries[0].name} */}
                  <div className='area'>
                    <h1 className='area__name'>{area.name}</h1>
                    <span className='area__info'>
                      Country: {area.countries[0].name}
                    </span>
                    <span className='area__info'>
                      Total Area: {area.reported_area}
                    </span>
                    {area.marine && (
                      <span className='area__info'>Protected marine area</span>
                    )}
                    {area.marine && (
                      <span className='area__info'>
                        Total marine area: {area.reported_marine_area}
                      </span>
                    )}
                    <span className='area__info'>
                      Category: {area.iucn_category.name}
                    </span>
                    <span className='area__info'>
                      Jurisdiction: {area.designation.name}
                    </span>
                    <span className='area__info'>
                      Management Authority: {area.management_authority.name}
                    </span>
                    <span className='area__info'>
                      Governance: {area.governance.governance_type}
                    </span>
                  </div>
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
  // Chunky because of the re-rendering of the map when there are areas...
  // Also maybe as about re-rendering the center... sort this out tomorrow morning...
  // maybe as someone for their opinion on conditionally rending this??
  // if (!areas) {
  //   return (
  //     <MapContainer
  //       className='map'
  //       center={[52, -112]}
  //       zoom={3}
  //       scrollWheelZoom={true}
  //     >
  //       <TileLayer
  //         attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  //         // attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
  //         url='https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg'
  //         // url='https://api.mapbox.com/styles/v1/dylanmasschelein/ckpyx7zjx4dga18nwl5c9fwwb/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZHlsYW5tYXNzY2hlbGVpbiIsImEiOiJja3B5dmlyZXUwaG55Mm9xc3RsNzBybWV2In0.NJDvx0UbxYYMpvuQsamo6w'
  //       />
  //     </MapContainer>
  //   );
  // }

  return (
    <div>
      <MapContainer
        className='map'
        center={[52, -122]}
        zoom={2.5}
        scrollWheelZoom={false}
      >
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
