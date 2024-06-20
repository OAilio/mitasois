/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from "react";
import Sort from "./Sort";
import ChefChoice from "./ChefChoice";
import SearchFilter from "./SearchFilter";
import FilterForm from "./FilterForm";
import ActiveFilterTags from "./ActiveFilterTags";
import FilterVisibilityButton from "./FilterVisibilityButton";

//TODO vittu apua kaikki
const Toolbar = ({ ascendingSort, setAscendingSort, searchInput, setSearchInput, foods, handleUpdate, proteinFilters,
  setProteinFilters, carbFilters, setCarbFilters, dateFilter, setDateFilter, dateFilterType, setDateFilterType }) => {

  // const [activeProteinFilters, setActiveProteinFilters] = useState([]);
  // const [activeCarbFilters, setActiveCarbFilters] = useState([]);
	// const [selectedDate, setSelectedDate] = useState('')
	// const [selectedDateFilterType, setSelectedDateFilterType] = useState(["before"])

  // const applyFilters = () => {
  //   setProteinFilters(activeProteinFilters)
  //   setCarbFilters(activeCarbFilters)
	// 	setDateFilter(selectedDate)
	// 	setDateFilterType(selectedDateFilterType)
  // };

	// Clear all filters, deselecting the form items and emptying the useStates
	// const clearFilters = () => {
	// 	setActiveProteinFilters([])
	// 	setProteinFilters([])
	// 	setActiveCarbFilters([])
	// 	setCarbFilters([])
	// 	setDateFilter(null)
	// 	setSelectedDate('')
	// 	};

  // this is FALSE, true only for devving
  const [filterOptionsIsVisible, setFilterOptionsIsVisible] = useState(true)

  return (
    <>
      <h2>Toolbar-component</h2>
      <Sort ascendingSort={ascendingSort} setAscendingSort={setAscendingSort} />
      <FilterVisibilityButton filterOptionsIsVisible={filterOptionsIsVisible} setFilterOptionsIsVisible={setFilterOptionsIsVisible}/>
      <SearchFilter searchInput={searchInput} setSearchInput={setSearchInput} />
      <ChefChoice foods={foods} handleUpdate={handleUpdate} />
      <FilterForm foods={foods} proteinFilters={proteinFilters} setProteinFilters={setProteinFilters} carbFilters={carbFilters} setCarbFilters={setCarbFilters} dateFilter={dateFilter} setDateFilter={setDateFilter}
			setDateFilterType={setDateFilterType} filterOptionsIsVisible={filterOptionsIsVisible} setFilterOptionsIsVisible={setFilterOptionsIsVisible}/>
      {/* <ActiveFilterTags proteinFilters={proteinFilters} setProteinFilters={setProteinFilters} carbFilters={carbFilters} setCarbFilters={setCarbFilters} 
      dateFilter={dateFilter} setDateFilter={setDateFilter} dateFilterType={dateFilterType} setDateFilterType={setDateFilterType}/> */}
    </>
  );
}

export default Toolbar;