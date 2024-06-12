/* eslint-disable react/prop-types */
import Select from 'react-select'

const Filter = ({ options, activeFilters, setActiveFilters, name }) => {
  const listOptions = [...options].map(option => ({
    value: option,
    label: option
  }));

  const handleChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map(option => option.value);
    setActiveFilters(selectedValues);
  }

  return (
    <>
      <h4>{name}</h4>
      <Select
        placeholder="Select"
        options={listOptions}
        value={activeFilters.map(filter => ({ value: filter, label: filter }))}
        onChange={handleChange} 
        isMulti={true}
        hideSelectedOptions={false}
      />
    </>
  );
};

export default Filter;