/* eslint-disable react/prop-types */
import Creatable from 'react-select/creatable';

const CarbSelect = ({ foods, carb, setCarb }) => {

  //Here you can alter the predefined options for carbs
  const predefinedCarbs = [
    { value: 'Rice', label: 'Rice' },
    { value: 'Pasta', label: 'Pasta' },
    { value: 'Bread', label: 'Bread' },
    { value: 'Vegetable', label: 'Vegetable' },
    { value: 'Quinoa', label: 'Quinoa' }
  ];

  const existingCarbs = foods.map(option => ({
    value: option.carb,
    label: option.carb
  }));

  const carbOptions = Array.from(
    new Set([...predefinedCarbs, ...existingCarbs].map(option => JSON.stringify(option)))
  ).map(option => JSON.parse(option)).sort((a, b) => a.label.localeCompare(b.label));

  return (
    <div>
    <label>
      Main Carb:
      <Creatable
        value={carb}
        options={carbOptions}
        onChange={(option) => setCarb(option)}
        onCreateOption={(inputValue) => {
          const newOption = { value: inputValue, label: inputValue }
          setCarb(newOption)
        }}
      />
    </label>
  </div>
  )
};

export default CarbSelect
