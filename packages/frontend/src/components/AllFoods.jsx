/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import formatDate from "../utils/formatDate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowUpLong } from '@fortawesome/free-solid-svg-icons';
import FoodForm from "./FoodForm";
import DeleteConfirmation from "./deleteConfirmation";
import '../css/allFoods.scss';

const AllFoods = ({ foods, ascendingSort, searchInput, handleDelete, handleUpdate, proteinFilters, carbFilters,
  dateFilter, dateFilterType, editingFood, setEditingFood, activeFood, setActiveFood }) => {

  const [formData, setFormData] = useState({ name: "", protein: null, carb: null, date: "" });
  const [foodToDelete, setFoodToDelete] = useState(null);

  useEffect(() => {
    if (activeFood) {
      const element = document.getElementById(`food-${activeFood}`);
      if (element) {
        const parentElement = element.parentElement;
        const elementTop = element.offsetTop;
        const marginTop = parseFloat(getComputedStyle(document.documentElement).fontSize); // Convert 1rem to pixels
  
        // Scroll the parent element to bring the target element into view with a margin of 1rem
        parentElement.scrollTo({
          top: elementTop - marginTop,
          behavior: 'smooth',
        });
      }
    }
  }, [activeFood]);

  useEffect(() => {
    if (editingFood) {
      // Set form data when editingFood is set
      setFormData({
        id: editingFood.id,
        name: editingFood.name,
        protein: editingFood.protein,
        carb: editingFood.carb,
        date: editingFood.date,
      });

      // Scroll the entire page to bring the parent element into view
      const element = document.getElementById(`food-${editingFood.id}`);
      if (element) {
        const parentElement = element.parentElement;
        const parentElementTop = parentElement.getBoundingClientRect().top + window.scrollY;
        const marginTop = parseFloat(getComputedStyle(document.documentElement).fontSize);

        window.scrollTo({
          top: parentElementTop - marginTop,
          behavior: 'smooth',
        });
      }
    } else {
      // Reset form data when editingFood is cleared
      setFormData({ id: "", name: "", protein: null, carb: null, date: "" });
  
      // Scroll the page back to the top
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [editingFood]);


  function handleEditClick(food) {
    setEditingFood(food);
  }

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

  function confirmDelete(food) {
    setFoodToDelete(food); // Set the food to be deleted and trigger the confirmation dialog
  }

  function handleDeleteConfirm() {
    handleDelete(foodToDelete.id); // Delete the food item
    setFoodToDelete(null); // Reset the food to delete
  }

  function handleDeleteCancel() {
    setFoodToDelete(null); // Cancel the delete action
  }

  const sortedFoods = [...foods].sort((a, b) => {
    if (ascendingSort) {
      return new Date(a.date) - new Date(b.date);
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  });

  const filteredFoods = sortedFoods.filter(
    (food) =>
      food.name.toLowerCase().includes(searchInput.toLowerCase()) &&
      (proteinFilters.length === 0 || proteinFilters.includes(food.protein)) &&
      (carbFilters.length === 0 || carbFilters.includes(food.carb)) &&
      (!dateFilter || filterByDate(food))
  );

  if (foods.length === 0){
    return (
      <div className="list-of-all-food-items">
        <div className="result-count" >
          <FontAwesomeIcon icon={faArrowUpLong} className="up-arrow"/>
          <span className="add-first">No foods here. Add something tasty!</span>
        </div>
      </div>
    )
  }

  return (
    <>
      <ul className="list-of-all-food-items">
        {filteredFoods.map((food) => (
          <li id={`food-${food.id}`} onClick={() => !editingFood && toggleOpenClick(food)} 
          className={`all-foods-container ${activeFood === food.id || (editingFood && editingFood.id === food.id) ? "open" : ""}`}
          key={food.id}>
            <div>
              <div className="item-content">
                <span className="food-name">{food.name}</span>
                <span className="food-date">{formatDate(food.date)}</span>
              </div>
              <div className="opened-item-options">
              {editingFood && editingFood.id === food.id ? (
                <FoodForm
                formData={formData}
                setFormData={setFormData}
                foods={foods}
                submit={handleUpdate}
                setEditing={setEditingFood}
                setActiveFood={setActiveFood} />
              ) : (
                <div>
                  {activeFood === food.id && (
                    <>
                      <div className="button-group">
                        <button className='secondary-button' onClick={() => handleEditClick(food)}>Edit</button>
                        <button className='primary-button' onClick={() => ateThisToday(food)}>Ate this today!</button>
                      </div>
                      <span className="tertiary-button" onClick={() => confirmDelete(food)}>
                        Delete <FontAwesomeIcon icon={faTrash} />
                      </span>
                    </>
                  )}
                </div>
              )}</div>
            </div>
          </li>
        ))}
        {filteredFoods.length < 1 ? (
          <div className="result-count none">
            No results found :(
          </div>
        ) : (
          filteredFoods.length === 1 ? (
            <div className="result-count">
              {filteredFoods.length} food
            </div>
          ) : (
            <div className="result-count">
              {filteredFoods.length} foods
            </div>
          )
        )}
      </ul>
      {foodToDelete && (
        <DeleteConfirmation 
          food={foodToDelete} 
          onConfirm={handleDeleteConfirm} 
          onCancel={handleDeleteCancel} 
        />
      )}
    </>
  );
};

export default AllFoods;

