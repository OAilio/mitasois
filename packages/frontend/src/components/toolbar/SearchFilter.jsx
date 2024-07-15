/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import '../../css/searchFilter.scss'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchFilter = ({ searchInput, setSearchInput }) => {

  const [searchOpen, setSearchOpen] = useState(false)

  console.log("search open:",searchOpen)

  function toggleSearch(){
    setSearchOpen(!searchOpen)
    setSearchInput('')
  }

  function handleSearchChange(e) {
    e.preventDefault();
    console.log('Search input:', e.target.value);
    setSearchInput(e.target.value);
  }

  return (
    <div className="search-filter">
      <button className='icon-container' onClick={toggleSearch}><FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' /></button>
      {searchOpen && (
        <input className='search-input' type="text" value={searchInput} onChange={handleSearchChange} placeholder="Food name..."/>
      )}
      {searchInput && (
        <button className='icon-container' onClick={toggleSearch}><FontAwesomeIcon icon={faXmark} className='x-icon' /></button>
      )}
    </div>
  )
}

export default SearchFilter;