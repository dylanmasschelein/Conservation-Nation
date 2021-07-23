import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Tooltip,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet-defaulticon-compatibility";
import "../AreaMap/AreaMap.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn } from "@fortawesome/free-solid-svg-icons";
import { marineStyle, landStyle } from "../../helperFunctions";
import SpecificArea from "../../components/SpecificArea/SpecificArea";
import { useDispatch } from "react-redux";
import { activeArea } from "../../redux/reducers/activeAreaSlice";

const AreaMap = (props) => {
  const {
    areas,
    onEachArea,
    PlotObservations,
    userLocation,
    center,
    observations,
  } = props;

  const [toggleMap, setToggleMap] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {}, [areas, userLocation, toggleMap]);

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
                  dispatch(activeArea(area));
                },
              }}
            >
              {!observations && (
                <Tooltip direction='top' className='tooltips' sticky>
                  <SpecificArea area={area} />
                </Tooltip>
              )}
            </GeoJSON>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <MapContainer
        className='map'
        center={[52, -122]}
        zoom={2.5}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        {!observations && center ? <CenterMap center={center} /> : null}
        {observations && <PlotObservations />}
        {toggleMap && (
          <TileLayer
            attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
            url='https://api.mapbox.com/styles/v1/dylanmasschelein/ckq1qqqes17n517ju45xlaqfq/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZHlsYW5tYXNzY2hlbGVpbiIsImEiOiJja3B5dmlyZXUwaG55Mm9xc3RsNzBybWV2In0.NJDvx0UbxYYMpvuQsamo6w'
          />
        )}
        {!toggleMap && (
          <TileLayer
            attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
            url='https://api.mapbox.com/styles/v1/dylanmasschelein/ckq1tjf5b0jig17n785z67zv4/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZHlsYW5tYXNzY2hlbGVpbiIsImEiOiJja3B5dmlyZXUwaG55Mm9xc3RsNzBybWV2In0.NJDvx0UbxYYMpvuQsamo6w'
          />
        )}

        {areas && <AreaPolygons />}
        <FontAwesomeIcon
          icon={faToggleOn}
          onClick={() => {
            setToggleMap(!toggleMap);
          }}
          className={
            toggleMap ? "map__toggle" : " map__toggle map__toggle--off"
          }
        />
      </MapContainer>
    </div>
  );
};

export default AreaMap;
