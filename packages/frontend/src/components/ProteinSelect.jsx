/* eslint-disable react/prop-types */
import Creatable from 'react-select/creatable';

const ProteinSelect = ({ foods, protein, setProtein }) => {

  //Here you can alter the predefined options for proteins
  const predefinedProteins = [
    { value: 'Beef', label: 'Beef' },
    { value: 'Chicken', label: 'Chicken' },
    { value: 'Egg', label: 'Egg' },
    { value: 'Pork', label: 'Pork' },
    { value: 'Vegetable', label: 'Vegetable' },
  ];

  const existingProteins = foods.map(option => ({
    value: option.protein,
    label: option.protein
  }));

  const proteinOptions = Array.from(
    new Set([...predefinedProteins, ...existingProteins].map(option => JSON.stringify(option)))
  ).map(option => JSON.parse(option)).sort((a, b) => a.label.localeCompare(b.label));

  return (
    <div>
    <label>
      Main protein:
      <Creatable
        value={protein}
        options={proteinOptions}
        onChange={(option) => setProtein(option)}
        onCreateOption={(inputValue) => {
          const newOption = { value: inputValue, label: inputValue }
          setProtein(newOption)
        }}
      />
    </label>
  </div>
  )
};

export default ProteinSelect
