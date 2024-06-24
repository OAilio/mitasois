/* eslint-disable react/prop-types */
import Creatable from 'react-select/creatable';

// TODO: kummatki predefinet samaa tiedostoo ja joku yhe sanan muuttuja jonka perusteella yhdistetään
// olemassa oleva lista tähän toiseen esim type="carb"
const IngredientSelect = ({ foods, ingredient, setIngredient, type }) => {

   // Here you can alter the predefined options
  const predefinedOptions = {
    protein: [
      { value: 'Beef', label: 'Beef' },
      { value: 'Chicken', label: 'Chicken' },
      { value: 'Egg', label: 'Egg' },
      { value: 'Pork', label: 'Pork' },
      { value: 'Vegetable', label: 'Vegetable' },
    ],
    carb: [
      { value: 'Rice', label: 'Rice' },
      { value: 'Pasta', label: 'Pasta' },
      { value: 'Bread', label: 'Bread' },
      { value: 'Vegetable', label: 'Vegetable' },
      { value: 'Quinoa', label: 'Quinoa' }
    ]
  };

  // Create value+label pair to display current selection
  const currentSelection = ingredient && typeof ingredient === 'object' ? ingredient : { value: ingredient, label: ingredient };

  // Determine which set of options to use based on the type prop
  const predefinedOptionsForType = type === 'protein' ? predefinedOptions.protein : predefinedOptions.carb;

  // Extract existing options
  const existingOptions = foods.map(option => ({
    value: type === 'protein' ? option.protein : option.carb,
    label: type === 'protein' ? option.protein : option.carb
  }));

  // Combine options excluding duplicates
  const ingredientOptions = Array.from(
    new Set([...predefinedOptionsForType, ...existingOptions].map(option => JSON.stringify(option)))
  ).map(option => JSON.parse(option)).sort((a, b) => a.label.localeCompare(b.label));

  return (
    <div>
      <label>
        Main {type}:
        <Creatable
          value={currentSelection}
          options={ingredientOptions}
          onChange={(option) => setIngredient(option)}
          onCreateOption={(inputValue) => {
            const newOption = { value: inputValue, label: inputValue };
            setIngredient(newOption);
          }}
        />
      </label>
    </div>
  );
};

export default IngredientSelect;
