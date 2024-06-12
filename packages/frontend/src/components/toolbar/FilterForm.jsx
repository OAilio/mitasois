/* eslint-disable react/prop-types */
import Filter from "./Filter";

const FilterForm = ({ foods, proteinFilters, setProteinFilters, carbFilters, setCarbFilters, dateFilter, setDateFilter,
	setDateFilterType, filterOptionsIsVisible}) => {

	if (!filterOptionsIsVisible) {
    return null;
  }
	console.log("Filter options visible:",filterOptionsIsVisible)

	console.log("Datefilter:",dateFilter)


  // Filter options
  const proteinOptions = [...new Set(foods.map(food => food.protein))].sort();
  const carbOptions = [...new Set(foods.map(food => food.carb))].sort();

  // Clear all filters, deselecting the form items and emptying the useStates
  const clearFilters = () => {
		setDateFilter('')
		setProteinFilters([])
    setCarbFilters([])
  };

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
          <option value="before">Before</option>
          <option value="after">After</option>
      </select>
			{/* <Datepicker selected={dateFilter} onChange={(date) => setDateFilter(date)}/>  */}
			<label>Date: <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} /></label>
		</div>
		<div>
			<h5 onClick={clearFilters}>Clear all</h5>
		</div>
		</>
	)
}

export default FilterForm