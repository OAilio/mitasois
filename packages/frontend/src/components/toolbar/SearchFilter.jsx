/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import '../../css/searchFilter.scss'
import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchFilter = ({ searchInput, setSearchInput }) => {
  const inputRef = useRef(null);

  function clearSearch(){
    setSearchInput('')
  }

  function handleSearchChange(e) {
    e.preventDefault();
    console.log('Search input:', e.target.value);
    setSearchInput(e.target.value);
  }

  const focusInputField = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="search-filter">
      <button className='icon-container' onClick={focusInputField}><FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' /></button>
      <div className='search-field-container'>
        <input ref={inputRef} className='search-input' type="text" value={searchInput} onChange={handleSearchChange} placeholder="Food name..."/>
        {searchInput && (
          <button className='icon-container' onClick={clearSearch}><FontAwesomeIcon icon={faXmark} className='x-icon' /></button>
        )}
      </div>
    </div>
  )
}

export default SearchFilter;