/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import formatDate from "../utils/formatDate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import FoodForm from "./FoodForm";
import '../css/allFoods.scss'

const AllFoods = ({ foods, ascendingSort, searchInput, handleDelete, handleUpdate, proteinFilters, carbFilters,
  dateFilter, dateFilterType, editingFood, setEditingFood, activeFood, setActiveFood }) => {
    
  // const [activeFood, setActiveFood] = useState(null);

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

  // Sets the food date to current date
  function ateThisToday(food) {
    const todaysDate = new Date().toLocaleDateString('en-CA');
    handleUpdate(food.id, {
      name: food.name,
      protein: food.protein?.value,
      carb: food.carb?.value,
      date: todaysDate
    });
  }

  function toggleOpenClick(food) {
    if (!editingFood) {
      setActiveFood(activeFood === food.id ? null : food.id);      
    }
  }

  function filterByDate(food) {
    if (dateFilterType === "Before") {
      return food.date <= dateFilter;
    } else {
      return food.date >= dateFilter;
    }
  }

  console.log("open food", activeFood)

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
    <div className="list-of-all-food-items">
      <ul>
        {filteredFoods.map((food) => (
          <li onClick={() => !editingFood && toggleOpenClick(food)} className={`food-item-container 
          ${activeFood === food.id || (editingFood && editingFood.id === food.id) ? "active" : ""}`} key={food.id}>
            <div className="single-food-item">
              <div className="item-content">
                <span className="food-name">{food.name}</span>
                <span className="food-date">{formatDate(food.date)}</span>
            </div>
            {editingFood && editingFood.id === food.id ? (
              <FoodForm
                formData={formData}
                setFormData={setFormData}
                foods={foods}
                submit={handleUpdate}
                setEditing={setEditingFood}
                setActiveFood={setActiveFood}
                />
            ) : (
              <div>
                {activeFood === food.id && (
                  <>
                    <div className="button-group">
                      <button className='secondary-button' onClick={() => handleEditClick(food)}>Edit</button>
                      <button className='primary-button' onClick={() => ateThisToday(food)}>Ate this today!</button>
                    </div>
                    <span className="tertiary-button" onClick={() => handleDelete(food.id)}>
                      Delete <FontAwesomeIcon icon={faTrash} />
                    </span>
                  </>
                )}
              </div>
            )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllFoods;
