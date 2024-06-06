/* eslint-disable react/prop-types */
const Filter = ({ options, activeFilters, setActiveFilters }) => {
  const toggleFilter = (option) => {
    setActiveFilters(prev =>
      prev.includes(option) ? prev.filter(p => p !== option) : [...prev, option]
    );
  };

  return (
    <div>
      {options.map(option => (
        <button 
          key={option} 
          onClick={() => toggleFilter(option)}
          style={{
            backgroundColor: activeFilters.includes(option) ? 'green' : 'grey',
            color: 'white'
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Filter;
