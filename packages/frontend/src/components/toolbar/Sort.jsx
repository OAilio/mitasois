/* eslint-disable react/prop-types */
const Sort = ({ ascendingSort, setAscendingSort}) => {
  function toggleSort() {
    setAscendingSort(prevState => {
      console.log('Sort:', !prevState ? 'Ascending' : "Descending");
      return !prevState;
    });
  }

  return (
    <><p>Current sort:</p><button onClick={toggleSort}>
      {ascendingSort ? 'Earliest to latest' : 'Latest to earliest'}
    </button></>
  )
}

export default Sort