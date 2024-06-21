/* eslint-disable react/prop-types */
import RenderTags from "./RenderTags";
import formatDate from "../../utils/formatDate";

const ActiveFilterTags = ({ proteinFilters, setProteinFilters, carbFilters, setCarbFilters, dateFilter, setDateFilter, dateFilterType, filterOptionsIsVisible, clearFilters}) => {
  
  // The active tags are only visible if the filtering options is closed or there aren't any filters applied
  if (filterOptionsIsVisible || proteinFilters.length === 0 && carbFilters.length === 0 && dateFilter === "") {
    return null
  }

  return (
    <><div>
      <h3>Active filters:</h3>
      <RenderTags
        filters={proteinFilters}
        setFilters={setProteinFilters}
      />
      <RenderTags 
        filters={carbFilters}
        setFilters={setCarbFilters}
      />
      {dateFilter && <button onClick={()=>setDateFilter("")}>{dateFilterType} {formatDate(dateFilter)} x</button>}
    </div>
    <p onClick={clearFilters}>Clear all filters</p>
    </>
  )
};

export default ActiveFilterTags;