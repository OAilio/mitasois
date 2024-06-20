/* eslint-disable react/prop-types */
const FilterVisibilityButton = ({ filterOptionsIsVisible, setFilterOptionsIsVisible}) => {
    function toggleFilterVisibility(){
        setFilterOptionsIsVisible(!filterOptionsIsVisible)
    }
  return (
    <div>
        <button onClick={toggleFilterVisibility}>Filters</button>
    </div>
  )
};

export default FilterVisibilityButton
