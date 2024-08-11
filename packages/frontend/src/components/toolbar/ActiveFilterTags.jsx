/* eslint-disable react/prop-types */
import RenderTags from "./RenderTags";
import formatDate from "../../utils/formatDate";
import '../../css/activeFilterTags.scss'

const ActiveFilterTags = ({ proteinFilters, setProteinFilters, carbFilters, setCarbFilters, 
                            dateFilter, setDateFilter, dateFilterType, clearFilters}) => {
  
  // The active tags are only visible if the filtering options is closed or there aren't any filters applied
  if (proteinFilters.length === 0 && carbFilters.length === 0 && dateFilter === "") {
    return null
  }

  return (
    <><div className="active-filter-container">
      <div className="active-filter-header">Filters:</div>
      <div className="active-filter-content">
        <RenderTags
          filters={proteinFilters}
          setFilters={setProteinFilters}
        />
        <RenderTags 
          filters={carbFilters}
          setFilters={setCarbFilters}
        />
        {dateFilter && <button onClick={()=>setDateFilter("")}>{dateFilterType} {formatDate(dateFilter)} x</button>}
        <button className="active-filter-clear-button" onClick={clearFilters}>Clear all</button>
      </div>
    </div>
    </>
  )
};

export default ActiveFilterTags;