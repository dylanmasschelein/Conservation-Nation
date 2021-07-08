import "./SearchBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBar(props) {
  const {
    setSearch,
    handleSearch,
    search,
    setClickedObservation,
    setTerrestrial,
  } = props;

  const handleChange = (e) => {
    setTerrestrial(e.target.value);
  };

  return (
    <form
      onSubmit={(e) => {
        handleSearch(e);
        setClickedObservation(null);
      }}
      className='search'
    >
      <input
        type='text'
        placeholder='Discover'
        name='search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='search__input'
      ></input>
      <div>
        <select
          name='terrestrial'
          id='terrestrial'
          onChange={handleChange}
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
