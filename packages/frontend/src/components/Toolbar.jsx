/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from "react";
import Filter from "./Filter";
const Toolbar = ({ ascendingSort, setAscendingSort, setSearchInput, foods, handleUpdate, proteinFilters, setProteinFilters, carbFilters, setCarbFilters }) => {

  function toggleSort() {
    setAscendingSort(prevState => {
      console.log('Ascending sort:', !prevState);
      return !prevState;
    });
  }

  function handleSearchChange(e) {
    e.preventDefault();
    console.log('Search input:', e.target.value);
    setSearchInput(e.target.value);
  }

  //TODO: lisää päivämäärän päivitystoiminto jotenki
  function chefRandomizer() {
    if (!Array.isArray(foods) || foods.length === 0) {
      console.log("Invalid input: foods must be a non-empty array");
      return null;
    }
    var selectedFood = foods[Math.floor(Math.random() * foods.length)];
    console.log(selectedFood);
    return selectedFood;
  }

  const [activeProteinFilters, setActiveProteinFilters] = useState([]);
  const [activeCarbFilters, setActiveCarbFilters] = useState([]);

  // Filter options
  const proteinOptions = [...new Set(foods.map(food => food.protein))].sort();
  const carbOptions = [...new Set(foods.map(food => food.carb))].sort();

  const applyFilters = () => {
    setProteinFilters(activeProteinFilters)
    setCarbFilters(activeCarbFilters)
  };

  const clearFilters = () => {
    setActiveProteinFilters([])
    setProteinFilters([])
    setActiveCarbFilters([])
    setCarbFilters([])
  };

  return (
    <>
      <h2>Toolbar-component</h2>
      <p>Current sort:</p>
      <button onClick={toggleSort}>
        {ascendingSort ? 'Earliest to latest' : 'Latest to earliest'}
      </button>
      <div>
        <h2>Filters</h2>
        <h4>Main protein</h4>
        <Filter 
          options={proteinOptions} 
          activeFilters={activeProteinFilters} 
          setActiveFilters={setActiveProteinFilters} 
        />
        <h4>Main carb</h4>
        <Filter 
          options={carbOptions} 
          activeFilters={activeCarbFilters} 
          setActiveFilters={setActiveCarbFilters} 
        />        
      </div>
      <div>
          <h5 onClick={clearFilters}>Clear all</h5>
          <button onClick={applyFilters}>Apply</button>
      </div>
      <div>
        <h3>Search</h3>
        <label>Search:<input type="text" onChange={handleSearchChange} placeholder="Search food by name..."/></label>
      </div>
      <h3>Chef's Choice</h3>
      <button onClick={chefRandomizer}>Chef's Choice</button>
    </>
  );
}

export default Toolbar;