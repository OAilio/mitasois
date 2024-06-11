/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import Sort from "./Sort";
import ChefChoice from "./ChefChoice";
import SearchFilter from "./SearchFilter";
import FilterForm from "./FilterForm";
const Toolbar = ({ ascendingSort, setAscendingSort, setSearchInput, foods, handleUpdate,
  setProteinFilters, setCarbFilters, setDateFilter, setDateFilterType }) => {
  return (
    <>
      <h2>Toolbar-component</h2>
      <Sort ascendingSort={ascendingSort} setAscendingSort={setAscendingSort} />
      <FilterForm foods={foods} setProteinFilters={setProteinFilters} setCarbFilters={setCarbFilters} setDateFilter={setDateFilter} setDateFilterType={setDateFilterType}/>
      <SearchFilter setSearchInput={setSearchInput} />
      <ChefChoice foods={foods} />
    </>
  );
}

export default Toolbar;