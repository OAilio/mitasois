/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import '../../css/searchFilter.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchFilter = ({ searchInput, setSearchInput }) => {

  function clearSearch(){
    setSearchInput('')
  }

  function handleSearchChange(e) {
    e.preventDefault();
    console.log('Search input:', e.target.value);
    setSearchInput(e.target.value);
  }

  return (
    <div className="search-filter">
      <button className='icon-container'><FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' /></button>
      <div className='search-field-container'>
        <input className='search-input' type="text" value={searchInput} onChange={handleSearchChange} placeholder="Food name..."/>
        {searchInput && (
          <button className='icon-container' onClick={clearSearch}><FontAwesomeIcon icon={faXmark} className='x-icon' /></button>
        )}
      </div>
    </div>
  )
}

export default SearchFilter;