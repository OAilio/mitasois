/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */

//TODO: lisää päivämäärän päivitystoiminto jotenki
const ChefChoice = ({ foods }) => {
  function chefRandomizer(){
    if (!Array.isArray(foods) || foods.length === 0) {
      console.log("Invalid input: foods must be a non-empty array");
      return null;
    }
    var selectedFood = foods[Math.floor(Math.random() * foods.length)];
    console.log(selectedFood);
    return selectedFood;
  }

  return (
    <button onClick={chefRandomizer}>Chef's Choice</button>
  )
}

export default ChefChoice;