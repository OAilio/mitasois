/* eslint-disable react/prop-types */
const Toolbar = ({ ascendingSort, setAscendingSort, setSearchInput }) => {

  function toggleSort() {
    setAscendingSort(prevState => {
      console.log('Ascending sort:', !prevState);
      return !prevState;
    });
  }

  function handleSearchChange(e) {
    e.preventDefault();
    console.log('Search input:', e.target.value);
    setSearchInput(e.target.value);
  }

  return (
    <>
      <h2>Toolbar-component</h2>
      <p>Current sort:</p>
      <button onClick={toggleSort}>
        {ascendingSort ? 'Earliest to latest' : 'Latest to earliest'}
      </button>
      <div>
        <label>Search:<input type="text" onChange={handleSearchChange} placeholder="Search food by name..."/></label>
      </div>
    </>
  );
}

export default Toolbar;