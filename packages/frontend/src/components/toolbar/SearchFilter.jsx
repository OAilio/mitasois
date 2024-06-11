/* eslint-disable react/prop-types */
const SearchFilter = ({ setSearchInput }) => {
  function handleSearchChange(e) {
    e.preventDefault();
    console.log('Search input:', e.target.value);
    setSearchInput(e.target.value);
  }

  return (
    <div>
    <h3>Search</h3>
    <label>Search:<input type="text" onChange={handleSearchChange} placeholder="Search food by name..."/></label>
  </div>
  )
}

export default SearchFilter