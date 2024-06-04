/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import formatDate from "../utils/formatDate"

const AllFoods = ({ foods, handleDelete, handleUpdate}) => {
  //TODO editing
  return (
    <div>
    <ul>
      {foods.map(food => (
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