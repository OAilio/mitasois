/* eslint-disable react/prop-types */
import { useState } from "react";
import Filter from "./Filter";

const FilterForm = ({ foods, setProteinFilters, setCarbFilters, setDateFilter, setDateFilterType }) => {
	const [activeProteinFilters, setActiveProteinFilters] = useState([]);
  const [activeCarbFilters, setActiveCarbFilters] = useState([]);
	const [selectedDate, setSelectedDate] = useState(null)
	const [selectedDateFilterType, setSelectedDateFilterType] = useState(["before"])

  // Filter options
  const proteinOptions = [...new Set(foods.map(food => food.protein))].sort();
  const carbOptions = [...new Set(foods.map(food => food.carb))].sort();

  const applyFilters = () => {
    setProteinFilters(activeProteinFilters)
    setCarbFilters(activeCarbFilters)
		setDateFilter(selectedDate)
		setDateFilterType(selectedDateFilterType)
  };

  const clearFilters = () => {
    setActiveProteinFilters([])
    setProteinFilters([])
    setActiveCarbFilters([])
    setCarbFilters([])
  };

	return (
		<>
		<div>
			<h2>Filters</h2>
			<h4>Main protein</h4>
			<Filter
				options={proteinOptions}
				activeFilters={activeProteinFilters}
				setActiveFilters={setActiveProteinFilters} />
			<h4>Main carb</h4>
			<Filter
				options={carbOptions}
				activeFilters={activeCarbFilters}
				setActiveFilters={setActiveCarbFilters} />
		</div>
		<div>
			<h4>Date made</h4>
			<select onChange={(e) => setSelectedDateFilterType(e.target.value)}>
          <option value="before">Before</option>
          <option value="after">After</option>
      </select>
			<label>Date: <input type="date" onChange={(e) => setSelectedDate(e.target.value)} /></label>
		</div>
		<div>
			<h5 onClick={clearFilters}>Clear all</h5>
			<button onClick={applyFilters}>Apply</button>
		</div>
		</>
	)
}

export default FilterForm