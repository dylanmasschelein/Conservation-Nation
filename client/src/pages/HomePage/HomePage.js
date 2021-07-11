import { useState, useEffect } from "react";
import "./HomePage.scss";
import AreaMap from "../../components/AreaMap/AreaMap";
import SearchBar from "../../components/SearchBar/SearchBar";
import Observation from "../../components/Observation/Observation";
import { treeIcon, coralIcon, findCenter } from "../../helperFunctions";
import axios from "axios";
import { Marker } from "react-leaflet";

const HomePage = (props) => {
  const {
    user,
    setToggleModal,
    setModalText,
    setRedirect,
    setOpen,
    setOpenLogin,
  } = props;

  const [search, setSearch] = useState("");
  const [areas, setAreas] = useState(null);
  const [areaBounds, setAreaBounds] = useState(null);
  const [observations, setObservations] = useState(null);
  const [clickedObservation, setClickedObservation] = useState(null);
  const [clickedArea, setClickedArea] = useState(null);
  const [center, setCenter] = useState(null);
  const [terrestrial, setTerrestrial] = useState("all");
  const [map, setMap] = useState(null);
  useEffect(() => {}, [
    areas,
    observations,
    clickedObservation,
    clickedArea,
    center,
  ]);

  // Handling search
  const handleSearch = async (e) => {
    e.preventDefault(e);
    console.log("button clicked");
    try {
      if (terrestrial === "marine") {
        const areas = await axios.get(`/areas/marine/${search}`);
        setCenter(findCenter(areas));
        setAreas(areas.data);
        setObservations(null);
      } else if (terrestrial === "land") {
        const areas = await axios.get(`/areas/land/${search}`);
        setCenter(findCenter(areas));
        setAreas(areas.data);
        setObservations(null);
      } else {
        const areas = await axios.get(`/areas/country/${search}`);
        setCenter(findCenter(areas));
        setAreas(areas.data);
        setObservations(null);
      }
    } catch (err) {
      console.error(err);
    }
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

  // Retrieving Observations data on btn click
  const exploreArea = () => {
    if (!clickedArea) {
      setRedirect("/");
      setToggleModal(true);
      setModalText("You must click an area to explore it!");
    }
    if (areaBounds) getINaturalistData();
  };

  // Calling API for obervation data
  const getINaturalistData = async () => {
    const { neLat, neLng, swLat, swLng } = areaBounds;
    try {
      const observations = await axios.get(
        `https://api.inaturalist.org/v1/observations?geo=true&mappable=true&photos=true&nelat=${neLat}&nelng=${neLng}&swlat=${swLat}&swlng=${swLng}&per_page=200`
      );
      setObservations(observations.data.results);
    } catch (err) {
      console.error(err);
    }
  };

  const PlotObservations = () => {
    if (!observations) {
      return null;
    } else {
      return observations.map((observation) => (
        <Marker
          key={observation.id}
          position={[
            observation.geojson.coordinates[1],
            observation.geojson.coordinates[0],
          ]}
          icon={clickedArea.marine ? coralIcon : treeIcon}
          eventHandlers={{
            click: () => {
              setClickedObservation(observation);
            },
          }}
        />
      ));
    }
  };

  const followArea = async () => {
    if (!user) {
      setToggleModal(true);
      setModalText("Please sign in to follow an area!");
      setRedirect("/");
      setOpen(true);
      setOpenLogin(true);
    } else if (!clickedArea) {
      setToggleModal(true);
      setModalText("You must inspect an area to follow it!");
      setRedirect("/");
    } else {
      const { email } = user;
      try {
        console.log("user hit");
        await axios.put(`/user/${email}`, {
          clickedArea,
        });

        setToggleModal(true);
        setModalText("Area followed!");
        setRedirect("/");
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className='home'>
      <div className='home__left'>
        <SearchBar
          setTerrestrial={setTerrestrial}
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
        {clickedArea && <h3 className='home__area'>{clickedArea.name}</h3>}

        {clickedObservation && (
          <Observation
            setToggleModal={setToggleModal}
            setModalText={setModalText}
            observation={clickedObservation}
            setClickedObservation={setClickedObservation}
          />
        )}
      </div>
      <div className='home__right'>
        <AreaMap
          areas={areas}
          onEachArea={onEachArea}
          PlotObservations={PlotObservations}
          setClickedArea={setClickedArea}
          center={center}
          observations={observations}
          setMap={setMap}
        />
      </div>
    </div>
  );
};

export default HomePage;
