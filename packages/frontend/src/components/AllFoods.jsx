/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import formatDate from "../utils/formatDate";
import FoodForm from "./FoodForm"; // JATKA TÄSTÄ

const AllFoods = ({ foods, ascendingSort, searchInput, handleDelete, handleUpdate, proteinFilters, carbFilters,
  dateFilter, dateFilterType, editingFood, setEditingFood }) => {
    
  const [openFood, setOpenFood] = useState(null);

  const sortedFoods = [...foods].sort((a, b) => {
    if (ascendingSort) {
      return new Date(a.date) - new Date(b.date);
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  });

  console.log("In edit:", editingFood);
  const [formData, setFormData] = useState({ name: "", protein: null, carb: null, date: "" });

  useEffect(() => {
    if (editingFood) {
      setFormData({
        id: editingFood.id,
        name: editingFood.name,
        protein: editingFood.protein,
        carb: editingFood.carb,
        date: editingFood.date,
      });
    } else {
      setFormData({ id: "", name: "", protein: null, carb: null, date: "" });
    }
  }, [editingFood]);

  function handleEditClick(food) {
    setEditingFood(food);
  }

  function toggleOpenClick(food) {
    setOpenFood(openFood === food.id ? null : food.id);
  }

  function filterByDate(food) {
    if (dateFilterType === "Before") {
      return food.date <= dateFilter;
    } else {
      return food.date >= dateFilter;
    }
  }

  console.log("-------------Filters--------------");
  console.log("Selected protein filters:", proteinFilters.length > 0 ? proteinFilters : "none");
  console.log("Selected carb filters:", carbFilters.length > 0 ? carbFilters : "none");
  console.log("Date filter:", dateFilter ? `${dateFilterType} ${formatDate(dateFilter)}` : "none");
  console.log("-----------------------------------");

  const filteredFoods = sortedFoods.filter(
    (food) =>
      food.name.toLowerCase().includes(searchInput.toLowerCase()) &&
      (proteinFilters.length === 0 || proteinFilters.includes(food.protein)) &&
      (carbFilters.length === 0 || carbFilters.includes(food.carb)) &&
      (!dateFilter || filterByDate(food))
  );

  console.log("render", filteredFoods.length, "foods");

  return (
    <div>
      <h2>All foods</h2>
      <ul>
        {filteredFoods.map((food) => (
          <li key={food.id}>
            {editingFood && editingFood.id === food.id ? (
              <FoodForm
                formData={formData}
                setFormData={setFormData}
                foods={foods}
                submit={handleUpdate}
                setEditing={setEditingFood}
              />
            ) : (
              <>
                <div onClick={() => toggleOpenClick(food)}>
                  {food.name} {formatDate(food.date)}
                </div>
                {openFood === food.id && (
                  <>
                    <button onClick={() => handleEditClick(food)}>Edit</button>
                    <button onClick={() => handleDelete(food.id)}>Delete</button>
                  </>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllFoods;
