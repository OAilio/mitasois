/* eslint-disable react/prop-types */

// Component used to display the active protein & carb filters as tags

const RenderTags = ({ filters, setFilters}) => {

	const removeFilter = (filter) => {
    setFilters(filters.filter((clicked) => clicked !== filter));
  }
  
  return (
    <div>
      {[...filters].map((filter, index) => (
        <button key={index} onClick={() => removeFilter(filter)}>{filter} x</button>
    ))}
    </div>
  )
};

export default RenderTags
