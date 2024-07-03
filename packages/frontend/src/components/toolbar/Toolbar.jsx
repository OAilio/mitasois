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
  setProteinFilters, carbFilters, setCarbFilters, dateFilter, setDateFilter, dateFilterType, setDateFilterType, setEditingFood }) => {

  const [filterOptionsIsVisible, setFilterOptionsIsVisible] = useState(false)

  // Clear all filters, deselecting the form items and emptying the useStates
  const clearFilters = () => {
		setDateFilter('')
		setProteinFilters([])
    setCarbFilters([])
  };  

  return (
    <>
    <div className="toolbar">
      {/* Delete the header later */}
      <h2>Toolbar-component</h2>
      <Sort 
        ascendingSort={ascendingSort} 
        setAscendingSort={setAscendingSort}
      />
      <FilterVisibilityButton
        filterOptionsIsVisible={filterOptionsIsVisible} 
        setFilterOptionsIsVisible={setFilterOptionsIsVisible}
      />
      <SearchFilter
        searchInput={searchInput} 
        setSearchInput={setSearchInput}
      />
      <ChefChoice
        foods={foods}
        handleUpdate={handleUpdate}
        setEditingFood={setEditingFood}
      />
      <FilterForm
        foods={foods} 
        proteinFilters={proteinFilters} 
        setProteinFilters={setProteinFilters}
        carbFilters={carbFilters} 
        setCarbFilters={setCarbFilters} 
        dateFilter={dateFilter} 
        setDateFilter={setDateFilter}
        setDateFilterType={setDateFilterType} 
        filterOptionsIsVisible={filterOptionsIsVisible} 
        clearFilters={clearFilters}
        />
      <ActiveFilterTags 
        proteinFilters={proteinFilters} 
        setProteinFilters={setProteinFilters} 
        carbFilters={carbFilters} 
        setCarbFilters={setCarbFilters} 
        dateFilter={dateFilter} 
        setDateFilter={setDateFilter} 
        dateFilterType={dateFilterType} 
        filterOptionsIsVisible={filterOptionsIsVisible} 
        clearFilters={clearFilters}/>
    </div>
    </>
  );
}

export default Toolbar;