/* eslint-disable react/prop-types */
import Filter from "./Filter";

const FilterForm = ({ foods, proteinFilters, setProteinFilters, carbFilters, setCarbFilters, dateFilter, setDateFilter,
	setDateFilterType, filterOptionsVisibility, clearFilters}) => {

	if (!filterOptionsVisibility) {
    return null;
  }

  // Filter options
  const proteinOptions = [...new Set(foods.map(food => food.protein))].sort();
  const carbOptions = [...new Set(foods.map(food => food.carb))].sort();

	return (
		<>
		<div>
			<h2>Filters</h2>
			<Filter
				options={proteinOptions}
				activeFilters={proteinFilters}
				setActiveFilters={setProteinFilters} 
				name="Main protein"/>
			<Filter
				options={carbOptions}
				activeFilters={carbFilters}
				setActiveFilters={setCarbFilters} 
				name="Main carb"/>
		</div>
		<div>
			<h4>Date made</h4>
			<select onChange={(e) => setDateFilterType(e.target.value)}>
          <option value="Before">Before</option>
          <option value="After">After</option>
      </select>
			<label>Date: <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} /></label>
		</div>
		<div>
			<h5 onClick={clearFilters}>Clear all</h5>
		</div>
		</>
	)
}

export default FilterForm