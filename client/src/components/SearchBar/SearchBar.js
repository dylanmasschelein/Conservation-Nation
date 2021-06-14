import "./SearchBar.scss";

function SearchBar({ handleChange, handleSearch, searchValue }) {
  return (
    <form onSubmit={handleSearch} className='search'>
      <label className='search__label'>
        Find a country
        <input
          type='text'
          placeholder='France...'
          name='search'
          value={searchValue}
          onChange={handleChange}
          className='search__input'
        ></input>
      </label>
      <button type='submit' className='search__btn'>
        Search
      </button>
    </form>
  );
}

export default SearchBar;
