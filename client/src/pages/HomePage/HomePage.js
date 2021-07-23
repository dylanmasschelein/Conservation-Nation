import { useState, useEffect } from "react";
import "./HomePage.scss";
import AreaMap from "../../components/AreaMap/AreaMap";
import SearchBar from "../../components/SearchBar/SearchBar";
import Observation from "../../components/Observation/Observation";
import { treeIcon, coralIcon, findCenter } from "../../helperFunctions";
import axios from "axios";
import { Marker } from "react-leaflet";
import { useSelector, useDispatch } from "react-redux";
import { displayModal } from "../../redux/reducers/modalSlice";
import { toggleNavbar } from "../../redux/reducers/navbarSlice";
import { setAreaBounds } from "../../redux/reducers/areaBoundsSlice";
import { setActiveObservation } from "../../redux/reducers/activeObservationSlice";
import { toggleLogin } from "../../redux/reducers/loginSlice";

const HomePage = ({ user }) => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const terrestrial = useSelector((state) => state.terrestrial);
  const activeArea = useSelector((state) => state.activeArea);
  const activeObservation = useSelector((state) => state.activeObservation);
  const areaBounds = useSelector((state) => state.areaBounds);

  const [areas, setAreas] = useState(null);
  const [observations, setObservations] = useState(null);
  const [center, setCenter] = useState(null);

  useEffect(() => {}, [
    areas,
    observations,
    activeObservation,
    activeArea,
    center,
  ]);

  // Handling search
  const handleSearch = async (e) => {
    e.preventDefault(e);
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
      dispatch(
        setAreaBounds({
          neLat: _northEast.lat,
          neLng: _northEast.lng,
          swLat: _southWest.lat,
          swLng: _southWest.lng,
        })
      );
    });
  };

  // Retrieving Observations data on btn click
  const exploreArea = () => {
    if (!activeArea) {
      dispatch(
        displayModal({
          toggleModal: true,
          redirect: "/",
          text: "You must click an area to explore it!",
        })
      );
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
          icon={activeArea.marine ? coralIcon : treeIcon}
          eventHandlers={{
            click: () => {
              dispatch(setActiveObservation(observation));
            },
          }}
        />
      ));
    }
  };

  const followArea = async () => {
    if (!user) {
      dispatch(
        displayModal({
          toggleModal: true,
          redirect: "/",
          text: "Please sign in to follow an area!",
        })
      );
      dispatch(toggleNavbar(true));
      dispatch(toggleLogin(true));
    } else if (!activeArea) {
      dispatch(
        displayModal({
          toggleModal: true,
          redirect: "/",
          text: "You must inspect an area to follow it!",
        })
      );
    } else {
      const { email } = user;
      try {
        await axios.put(`/user/${email}`, {
          activeArea,
        });

        dispatch(
          displayModal({
            toggleModal: true,
            redirect: "/",
            text: "Area followed!",
          })
        );
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className='home'>
      <div className='home__left'>
        <SearchBar handleSearch={handleSearch} search={search} />
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
        {activeArea && <h3 className='home__area'>{activeArea.name}</h3>}

        {activeObservation && <Observation observation={activeObservation} />}
      </div>
      <div className='home__right'>
        <AreaMap
          areas={areas}
          onEachArea={onEachArea}
          PlotObservations={PlotObservations}
          center={center}
          observations={observations}
        />
      </div>
    </div>
  );
};

export default HomePage;
