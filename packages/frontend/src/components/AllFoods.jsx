/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import formatDate from "../utils/formatDate"

const AllFoods = ({ foods, ascendingSort, searchInput,handleDelete, handleUpdate}) => {
  
  const sortedFoods = [...foods].sort((a, b) => {
    if (ascendingSort) {
      return new Date(a.date) - new Date(b.date);
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  });

  const filteredFoods = sortedFoods.filter(food =>
    food.name.toLowerCase().includes(searchInput.toLowerCase()))

  //TODO editing
  return (
    <div>
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