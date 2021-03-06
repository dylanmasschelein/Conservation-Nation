import "./SearchBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { areaSearch } from "../../redux/reducers/searchSlice";
import { terrestrialSearch } from "../../redux/reducers/terrestrialSlice";
import { clearObservation } from "../../redux/reducers/activeObservationSlice";
function SearchBar(props) {
  const { handleSearch, search } = props;

  const dispatch = useDispatch();

  const handleAreaSearch = (e) => {
    dispatch(areaSearch(e.target.value));
  };

  const handleTerrestrialChange = (e) => {
    dispatch(terrestrialSearch(e.target.value));
  };

  return (
    <form
      onSubmit={(e) => {
        handleSearch(e);
        dispatch(clearObservation());
      }}
      className='search'
    >
      <input
        type='text'
        placeholder='Discover'
        name='search'
        value={search}
        onChange={handleAreaSearch}
        className='search__input'
      ></input>
      <div>
        <select
          name='terrestrial'
          id='terrestrial'
          onChange={handleTerrestrialChange}
          className='search__select'
        >
          <option value='all' className='search__option'>
            All
          </option>
          <option value='marine' className='search__option'>
            Marine
          </option>
          <option value='land' className='search__option'>
            Land
          </option>
        </select>
      </div>

      <button type='submit' className='search__btn'>
        <FontAwesomeIcon icon={faSearch} className='search__icon' />
      </button>
    </form>
  );
}

export default SearchBar;
