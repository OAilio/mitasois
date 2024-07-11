/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from "react";
import Sort from "./Sort";
import ChefChoice from "./ChefChoice";
import SearchFilter from "./SearchFilter";
import FilterForm from "./FilterForm";
import ActiveFilterTags from "./ActiveFilterTags";
import VisibilityButton from "./VisibilityButton";

import '../../css/toolbar.scss'

const Toolbar = ({ ascendingSort, setAscendingSort, searchInput, setSearchInput, foods, handleUpdate, proteinFilters,
  setProteinFilters, carbFilters, setCarbFilters, dateFilter, setDateFilter, dateFilterType, setDateFilterType, setActiveFood }) => {

  const [filterOptionsVisibility, setFilterOptionsVisibility] = useState(false)
  const [chefChoiceVisibility, setChefChoiceVisibility] = useState(false)

  // Clear all filters, deselecting the form items and emptying the useStates
  const clearFilters = () => {
		setDateFilter('')
		setProteinFilters([])
    setCarbFilters([])
  };  

  return (
    <>
    <div>
      <div className="toolbar-container">
        <div className="toolbar-left">
          <Sort 
            ascendingSort={ascendingSort} 
            setAscendingSort={setAscendingSort}
          />
          <VisibilityButton
            visibility={filterOptionsVisibility} 
            setVisibility={setFilterOptionsVisibility}
            icon={"Filters"}
          />
          <SearchFilter
            searchInput={searchInput} 
            setSearchInput={setSearchInput}
          />
        </div>
        <div className="toolbar-right">
          <VisibilityButton
            visibility={chefChoiceVisibility} 
            setVisibility={setChefChoiceVisibility}
            icon={"Chef Choice"}
          />
        </div>
      </div>
      <ChefChoice
        foods={foods}
        setActiveFood={setActiveFood}
        chefChoiceVisible={chefChoiceVisibility}
        setChefChoiceVisible={setChefChoiceVisibility}
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
        filterOptionsVisibility={filterOptionsVisibility} 
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
        filterOptionsVisibility={filterOptionsVisibility} 
        clearFilters={clearFilters}/>
    </div>
    </>
  );
}

export default Toolbar;