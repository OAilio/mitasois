/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import '../../css/chefChoice.scss'

const ChefChoice = ({ foods, setActiveFood, chefChoiceVisible, setChefChoiceVisible }) => {
  const [selectedFood, setSelectedFood] = useState(null);
  const [lastSelectedFood, setLastSelectedFood] = useState(null);
  const [isCycling, setIsCycling] = useState(false);
  const [animateFood, setAnimateFood] = useState(false);

  // If not visible return null
  if (!chefChoiceVisible) {
    return null;
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
    setIsCycling(true); // Start cycling
    setAnimateFood(false); // Reset animation state

    let cycleCount = 0;
    const maxCycles = 15;

    const intervalId = setInterval(() => {
      const food = foods[Math.floor(Math.random() * foods.length)];
      setSelectedFood(food);
      cycleCount++;

      if (cycleCount >= maxCycles) {
        clearInterval(intervalId);
        const finalFood = Randomizer();
        setSelectedFood(finalFood);
        setIsCycling(false); // Stop cycling

        setTimeout(() => {
          setAnimateFood(true); // Trigger the enlarge animation
        }, 100); // Small delay before animation
      }
    }, 100); // Adjust the speed of the cycling effect here (100ms for fast cycling)
  };

  const openFoodItem = (food) => {
    setActiveFood(food.id)
    setSelectedFood(null)
    setChefChoiceVisible(false)
  };

  const closeMenu = () => {
    setChefChoiceVisible(false)
    setSelectedFood(null)
    setLastSelectedFood(null)
  };

  return (
    <>
      <div className="darkened-background-container">
        <div className="chef-choice-container">
          <div className="chef-choice-heading">
            <button className="x-container" onClick={closeMenu}>
              <FontAwesomeIcon icon={faCircleXmark} className='x-icon' />
            </button>
            <img className="chef-image" src="./chef.svg" alt="Chef Image" />
            <span>Chef's Choice</span>        
          </div>
          <div>
            {!selectedFood && !isCycling ? (
              <div className="chef-choice-content">
                <span className="chef-choice-text">Want to hear tonight's specials?</span>
                <div className="button-group">
                  <button className='secondary-button' onClick={closeMenu}>Not interested</button>
                  <button className="primary-button" onClick={randomizeFood}>I'm all ears!</button>
                </div>
              </div>
            ) : (
              <div className="chef-choice-content">
                <span className="chef-choice-text">The kitchen recommends you have</span>
                <span className={`recommended-food ${animateFood ? 'enlarge' : ''}`}>
                  {selectedFood?.name}
                </span>
                {!isCycling && (
                  <div className="button-group">
                    <button className='secondary-button' onClick={randomizeFood}>Any other options?</button>
                    <button className='primary-button' onClick={() => openFoodItem(selectedFood)}>Let's do it!</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChefChoice;
