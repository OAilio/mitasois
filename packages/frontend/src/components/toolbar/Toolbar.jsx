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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faDice } from '@fortawesome/free-solid-svg-icons';

import '../../css/toolbar.scss'

const Toolbar = ({ ascendingSort, setAscendingSort, searchInput, setSearchInput, foods, proteinFilters,
  setProteinFilters, carbFilters, setCarbFilters, dateFilter, setDateFilter, dateFilterType, 
  setDateFilterType, setActiveFood, setMessage, setMessageHeading }) => {

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
          <span className="left-item">
            <Sort
              ascendingSort={ascendingSort} 
              setAscendingSort={setAscendingSort}
            />
          </span>
          <span className="left-item">
            <VisibilityButton
              visibility={filterOptionsVisibility} 
              setVisibility={setFilterOptionsVisibility}
              closeOther={setChefChoiceVisibility}
              icon={<FontAwesomeIcon icon={faFilter}/>}
              classname="filter-button"
            />
          </span>
          <span className="right-item">
            <SearchFilter
              searchInput={searchInput} 
              setSearchInput={setSearchInput}
            />
          </span>
        </div>
        <div className="toolbar-right">
          <VisibilityButton
            visibility={chefChoiceVisibility} 
            setVisibility={setChefChoiceVisibility}
            closeOther={setFilterOptionsVisibility}
            icon={<FontAwesomeIcon icon={faDice}/>}
            text="Chef's Choice"
            classname="chef-button"
          />
        </div>
      </div>
      <ChefChoice
        foods={foods}
        setActiveFood={setActiveFood}
        chefChoiceVisible={chefChoiceVisibility}
        setChefChoiceVisible={setChefChoiceVisibility}
        setMessage={setMessage}
        setMessageHeading={setMessageHeading}
      />
      <FilterForm
        foods={foods} 
        proteinFilters={proteinFilters} 
        setProteinFilters={setProteinFilters}
        carbFilters={carbFilters} 
        setCarbFilters={setCarbFilters} 
        dateFilter={dateFilter} 
        setDateFilter={setDateFilter}
        dateFilterType={dateFilterType}
        setDateFilterType={setDateFilterType} 
        filterOptionsVisibility={filterOptionsVisibility}
        setFilterOptionsVisibility={setFilterOptionsVisibility}
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
        clearFilters={clearFilters}/>
    </div>
    </>
  );
}

export default Toolbar;