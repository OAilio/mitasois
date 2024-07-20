/* eslint-disable react/prop-types */

// The component that is used in picking the protein & carb filters
import '../../css/ingredientSelect.scss'
import React from 'react';
import Select, { components } from 'react-select';

const Filter = ({ options, activeFilters, setActiveFilters, name }) => {
  const sortedOptions = [...options].sort((a, b) => a.localeCompare(b));
  const listOptions = sortedOptions.map(option => ({
    value: option,
    label: option
  }));

  const handleChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map(option => option.value);
    setActiveFilters(selectedValues);
  }

  // Custom valuecontainer to display the amount of selected options
  // instead of clickable filters.

  
  const ValueContainer = ({ children, ...props }) => {

    const selectedOptions = props.getValue();
    const count = selectedOptions.length;

    return (
      <components.ValueContainer {...props}>
        {count > 0 ? `${count} selected` : 'Select'}
        {React.cloneElement(children[1])}
      </components.ValueContainer>
    );
  };

  return (
    <div className="select filter">
      <span className='select-label'>Main {name}</span>
      <Select
        className="ingredient-select"
        classNamePrefix="ingSelect"
        options={listOptions}
        value={activeFilters.map(filter => ({ value: filter, label: filter }))}
        onChange={handleChange} 
        isMulti={true}
        hideSelectedOptions={false}
        isSearchable={false}
        components={{ ValueContainer }}
        closeMenuOnSelect={false}
      />
    </div>
  );
};

export default Filter;