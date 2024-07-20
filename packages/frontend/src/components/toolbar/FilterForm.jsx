/* eslint-disable react/prop-types */
import Filter from "./Filter";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import '../../css/filterForm.scss'

const FilterForm = ({ foods, proteinFilters, setProteinFilters, carbFilters, setCarbFilters, dateFilter, setDateFilter,
	setDateFilterType, filterOptionsVisibility, setFilterOptionsVisibility, clearFilters}) => {

	if (!filterOptionsVisibility) {
    return null;
  }

  function closeFilterForm(){
	setFilterOptionsVisibility(false)
  }

  // Filter options
  const proteinOptions = [...new Set(foods.map(food => food.protein))].sort();
  const carbOptions = [...new Set(foods.map(food => food.carb))].sort();

	return (
		<>
		<div className="filter-form-container">
			<div className="filter-form-header">
				<span>Filters</span>
				<button className="close-container" onClick={closeFilterForm}><FontAwesomeIcon icon={faCircleXmark} className='close-icon' /></button>
			</div>	
			<div className="filter-form-content">
			{/* <div className="filter-form-header">Filters:</div> */}
				<div>
					<Filter
						options={proteinOptions}
						activeFilters={proteinFilters}
						setActiveFilters={setProteinFilters} 
						name="protein"
					/>
				</div>
				<div>
				<Filter
					options={carbOptions}
					activeFilters={carbFilters}
					setActiveFilters={setCarbFilters} 
					name="carb"
				/>
				</div>
				<div>
					{/* <h4>Date made</h4> */}
					<select onChange={(e) => setDateFilterType(e.target.value)}>
						<option value="Before">Before</option>
						<option value="After">After</option>
					</select>
					<label><input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} /></label>
				</div>
			</div>
			<div>
				<button className="clear-button" onClick={clearFilters}>Clear all</button>
			</div>
		</div>
		{/* <ActiveFilterTags /> */}
		</>
	)
}

export default FilterForm