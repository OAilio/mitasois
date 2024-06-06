/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import formatDate from "../utils/formatDate"

const AllFoods = ({ foods, ascendingSort, searchInput, handleDelete, handleUpdate, proteinFilters, carbFilters}) => {
  
  const sortedFoods = [...foods].sort((a, b) => {
    if (ascendingSort) {
      return new Date(a.date) - new Date(b.date);
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  });

  const filteredFoods = sortedFoods.filter(food => 
    food.name.toLowerCase().includes(searchInput.toLowerCase()) &&
    (proteinFilters.length === 0 || proteinFilters.includes(food.protein)) &&
    (carbFilters.length === 0 || carbFilters.includes(food.carb))
  );
  //TODO editing
  return (
    <div>
      <h2>All foods</h2>
    <ul>
      {filteredFoods.map(food => (
        <li key={food.id}>
          {food.name} {formatDate(food.date)}
          <button onClick={() => handleDelete(food.id)}>Delete</button>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default AllFoods