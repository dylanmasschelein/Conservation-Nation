import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./HomePage.scss";
import AreaMap from "../../components/AreaMap/AreaMap";
import SearchBar from "../../components/SearchBar/SearchBar";
import Observation from "../../components/Observation/Observation";
import Tutorial from "../../components/Tutorial/Tutorial";
import axios from "axios";
import L from "leaflet";
import tree from "../../assets/Images/tree.png";
import { Marker } from "react-leaflet";

const HomePage = ({ user, setToggleModal, setModalText }) => {
  const [search, setSearch] = useState("");
  const [areas, setAreas] = useState(null);
  const [areaBounds, setAreaBounds] = useState(null);
  const [observations, setObservations] = useState(null);
  const [clickedObservation, setClickedObservation] = useState(null);
  const [clickedArea, setClickedArea] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [center, setCenter] = useState(null);

  // Getting userlocation on initial load and setting to map center -- needs work

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation([latitude, longitude]);
    });
  };

  useEffect(() => {});

  useEffect(() => {}, [
    areas,
    observations,
    clickedObservation,
    clickedArea,
    center,
  ]);

  // Handling search
  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:8080/areas/country/${search}`)
      .then((areas) => {
        //should re-render and recenter??
        setCenter([
          areas.data[0].geojson.geometry.coordinates[0][0][1],
          areas.data[0].geojson.geometry.coordinates[0][0][0],
        ]);
        setAreas(areas.data);
        setObservations(null);
      })
      .catch((err) => console.error(err));
  };

  // Setting bounds for clicked areas and retrieving observation data
  const onEachArea = (feature, layer) => {
    layer.on("click", (e) => {
      const { _northEast, _southWest } = e.target._bounds;
      setAreaBounds({
        neLat: _northEast.lat,
        neLng: _northEast.lng,
        swLat: _southWest.lat,
        swLng: _southWest.lng,
      });
    });
  };

  const exploreArea = () => {
    if (!clickedArea) {
      setToggleModal(true);
      setModalText("You must click an area to explore it!");
    }
    if (areaBounds) getINaturalistData();
  };

  const getINaturalistData = () => {
    console.log("getINaturalistData");
    const { neLat, neLng, swLat, swLng } = areaBounds;
    axios
      .get(
        `https://api.inaturalist.org/v1/observations?geo=true&mappable=true&photos=true&nelat=${neLat}&nelng=${neLng}&swlat=${swLat}&swlng=${swLng}&per_page=100`
      )
      .then((observations) => {
        setObservations(observations.data.results);
      })
      .catch((err) => console.error(err));
  };

  const PlotObservations = () => {
    if (!observations) {
      return null;
    } else {
      return observations.map((observation) => (
        <Marker
          key={observation._id}
          position={[
            observation.geojson.coordinates[1],
            observation.geojson.coordinates[0],
          ]}
          icon={icon}
          eventHandlers={{
            click: () => {
              setClickedObservation(observation);
            },
          }}
        />
      ));
    }
  };
  //user.update is not a function (backend)
  const followArea = () => {
    if (!user) {
      setToggleModal(true);
      setModalText("Please sign in to follow an area!");
    } else {
      const { email } = user;
      console.log("clicked");
      //grab whoever is logged in id/username or something so i can find them on the backend and update
      axios
        .put(`http://localhost:8080/user/${email}`, {
          clickedArea,
        })
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    }
  };
  // Custom Icon
  const icon = L.icon({
    iconUrl: tree,

    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
  });

  return (
    <div className='home'>
      <div className='home__left'>
        <SearchBar
          setSearch={setSearch}
          handleSearch={handleSearch}
          search={search}
          setClickedObservation={setClickedObservation}
        />
        <div className='home__button-div'>
          <button onClick={followArea} className='home__button'>
            FOLLOW
          </button>
          <button
            onClick={exploreArea}
            className='home__button home__button--right'
          >
            EXPLORE
          </button>
        </div>

        {/* {!clickedObservation ? (
          <Tutorial />
        ) : ( */}
        {clickedObservation && <Observation observation={clickedObservation} />}
        {/* )} */}
      </div>
      <div className='home__right'>
        {/* <ExploreBtn PlotObservations={PlotObservations} /> */}
        <AreaMap
          areas={areas}
          onEachArea={onEachArea}
          PlotObservations={PlotObservations}
          setClickedArea={setClickedArea}
          userLocation={userLocation}
          center={center}
          observations={observations}
        />
      </div>
    </div>
  );
};

export default HomePage;
