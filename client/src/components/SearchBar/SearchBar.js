import "./SearchBar.scss";

function SearchBar({ setSearch, handleSearch, search }) {
  return (
    <form onSubmit={handleSearch} className='search'>
      <label className='search__label'>Find a country </label>
      <input
        type='text'
        placeholder='France...'
        name='search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='search__input'
      ></input>

      <button type='submit' className='search__btn'>
        Search
      </button>
    </form>
  );
}

export default SearchBar;
