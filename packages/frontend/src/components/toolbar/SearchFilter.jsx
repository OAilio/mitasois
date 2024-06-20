/* eslint-disable react/prop-types */
const SearchFilter = ({ searchInput, setSearchInput }) => {
  function handleSearchChange(e) {
    e.preventDefault();
    console.log('Search input:', e.target.value);
    setSearchInput(e.target.value);
  }

  function clearSearchInput(){
    setSearchInput('')
  }

  return (
    <div>
    <h3>Search</h3>
    <label>Search:<input type="text" value={searchInput} onChange={handleSearchChange} placeholder="Search food by name..."/></label>
    {searchInput && <button onClick={clearSearchInput}>x</button>}
  </div>
  )
}

export default SearchFilter