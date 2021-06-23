import "./SearchBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ setSearch, handleSearch, search, setClickedObservation }) {
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

      <button type='submit' className='search__btn'>
        <FontAwesomeIcon icon={faSearch} className='search__icon' />
      </button>
    </form>
  );
}

export default SearchBar;
