/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import '../../css/sort.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

const Sort = ({ ascendingSort, setAscendingSort}) => {
  function toggleSort() {
    setAscendingSort(prevState => {
      console.log('Sort:', !prevState ? 'Ascending' : "Descending");
      return !prevState;
    });
  }

  return (
    <>
    <button className='sort-button' onClick={toggleSort}>
      <FontAwesomeIcon icon={faCalendarDays} className='sort-icon left' />
      {ascendingSort ? <FontAwesomeIcon icon={faArrowUp} className='sort-icon'/> : <FontAwesomeIcon icon={faArrowDown} className='sort-icon'/>}
    </button>
    </>
  )
}

export default Sort