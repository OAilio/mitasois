/* eslint-disable react/prop-types */
import '../../css/tag.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

// Component used to display the active protein & carb filters as tags

const RenderTags = ({ filters, setFilters}) => {

	const removeFilter = (filter) => {
    setFilters(filters.filter((clicked) => clicked !== filter));
  }
  
  return (
    <div className='list-of-tags'>
      {[...filters].map((filter, index) => (
        <button key={index} className="filter-tag" onClick={() => removeFilter(filter)}>
          {filter}<FontAwesomeIcon icon={faCircleXmark} className='filter-tag-icon'/>
        </button>
    ))}
    </div>
  )
};

export default RenderTags
