/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from "react";
import '../../css/chefChoice.scss'

const ChefChoice = ({ foods, setActiveFood, chefChoiceVisible, setChefChoiceVisible }) => {

  const [selectedFood, setSelectedFood] = useState(null);
  const [lastSelectedFood, setLastSelectedFood] = useState(null);

  // If not visible return null
  if (!chefChoiceVisible) {
    return null
  }

  // Randomly select a food
  function Randomizer() {
    if (!Array.isArray(foods) || foods.length === 0) {
      console.log("Invalid input: foods must be a non-empty array");
      return null;
    }
    // Ensure the food is different from the last selected one
    let food = RandomFoodDifferentFromLastSelected();
    // If for some reason we couldn't find a different food, just return the first one
    if (!food) {
      food = foods[0];
    }
    console.log("Suggested food:", food.name);
    return food;
  }

  function RandomFoodDifferentFromLastSelected() {
    let randomFood = foods[Math.floor(Math.random() * foods.length)];
    // Ensure the randomly selected food is different from the last selected one
    while (randomFood === lastSelectedFood) {
      randomFood = foods[Math.floor(Math.random() * foods.length)];
    }
    // Update the last selected food
    setLastSelectedFood(randomFood);
    return randomFood;
  }

  const randomizeFood = () => {
    const food = Randomizer();
    setSelectedFood(food);
  };

  const openFoodItem = (food) => {
    setActiveFood(food.id);
    setSelectedFood(null);
    setChefChoiceVisible(false);
  };

  const closeMenu = () => {
    setChefChoiceVisible(false);
    setSelectedFood(null);
    setLastSelectedFood(null);
  };

  

  return (
    <>
      <button onClick={closeMenu}>X</button>
        {!selectedFood ? (
          <div>
            <h4>Want to hear tonight's specials?</h4>
            <button onClick={randomizeFood}>I'm all ears!</button>
          </div>
        ) : (
          <div>
            <p>The kitchen recommends you have {selectedFood.name}</p>
            <button onClick={randomizeFood}>Any other options?</button>
            <button onClick={() => openFoodItem(selectedFood)}>Let's do it!</button>
          </div>
        )}
    </>
  );
};

export default ChefChoice;
