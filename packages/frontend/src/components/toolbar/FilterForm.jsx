/* eslint-disable react/prop-types */
import Filter from "./Filter";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../../css/filterForm.scss'

const FilterForm = ({ foods, proteinFilters, setProteinFilters, carbFilters, setCarbFilters, dateFilter, setDateFilter, 
	dateFilterType, setDateFilterType, filterOptionsVisibility, setFilterOptionsVisibility, clearFilters}) => {

	if (!filterOptionsVisibility) {
    return null;
  }

  function closeFilterForm(){
	setFilterOptionsVisibility(false)
  }

	const toggleDateFilterType = () => {
    const newFilterType = dateFilterType === 'Before' ? 'After' : 'Before';
    setDateFilterType(newFilterType);
  };

  // Filter options
  const proteinOptions = [...new Set(foods.map(food => food.protein))].sort();
  const carbOptions = [...new Set(foods.map(food => food.carb))].sort();

	return (
		<>
		<div className="filter-form-placement">
			<div className="filter-form-container">
				<div className="filter-form-header">
					<span>Filters</span>
					<button className="close-container" onClick={closeFilterForm}><FontAwesomeIcon icon={faCircleXmark} className='close-icon' /></button>
				</div>	
				<div className="filter-form-content">
					<div className="filter-picker-container">
						<Filter
							options={proteinOptions}
							activeFilters={proteinFilters}
							setActiveFilters={setProteinFilters} 
							name="protein"
						/>
					</div>
					<div className="filter-picker-container">
					<Filter
						options={carbOptions}
						activeFilters={carbFilters}
						setActiveFilters={setCarbFilters} 
						name="carb"
					/>
					</div>
					<div className="date-label">Date:</div>
					<div className='input-field'>
						<button className="date-type-toggle" onClick={toggleDateFilterType} title="Toggle date comparison mode">
							<FontAwesomeIcon className="date-type-toggle-icon" icon={faArrowRightArrowLeft}></FontAwesomeIcon>{dateFilterType}
						</button>
						<input className="input" type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
					</div>
				</div>
				<div>
					<button className="clear-button" onClick={clearFilters}>Clear all</button>
				</div>
			</div>
		</div>
		</>
	)
}

export default FilterForm