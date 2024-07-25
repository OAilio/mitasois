/* eslint-disable react/prop-types */
// import { useState } from "react";
import IngredientSelect from './IngredientSelect';
import '../css/foodForm.scss'

const FoodForm = ({formData, setFormData, submit, foods, setEditing, setActiveFood, setAddFormOpen}) => {

  // If the food data contains "id", it's an update operation
	const handleSubmit = (e) => {
		e.preventDefault();
    if (formData.id){
      submit(formData.id, {
        name: formData.name,
        protein: formData.protein?.value,
        carb: formData.carb?.value,
        date: formData.date
      });
      console.log("Updated:", formData)
      setEditing(null) // De-select the editing state
      setActiveFood(formData.id) // Set the openFood state back, so the item stays active.
    } else {
      submit({
        name: formData.name,
        protein: formData.protein?.value,
        carb: formData.carb?.value,
        date: formData.date
      })
      setFormData({ name: '', protein: null, carb: null, date: '' });
      setAddFormOpen(false)
    }
	};

	const handleCancel = () => {
    if (formData.id){
      setFormData({ name: '', protein: null, carb: null, date: '' });	
      setEditing(null) // De-select the editing state
      setActiveFood(formData.id) // Set the openFood state back, so the item stays active.
    } else {
      setFormData({ name: '', protein: null, carb: null, date: '' });
      setAddFormOpen(false)		      
    }
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};
	
	// Better button copy needed
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='form-container'>
          <div className='input-field'>
            <label>Name:
              <input className="input" type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Food name' required />
            </label>
          </div>
          <div>
            <IngredientSelect
              foods={foods} 
              ingredient={formData.protein} 
              setIngredient={(protein) => setFormData((prevData) => ({ ...prevData, protein }))}
              type="protein"
            />
          </div>
          <div>
            <IngredientSelect
              foods={foods}
              ingredient={formData.carb}
              setIngredient={(carb) => setFormData((prevData) => ({ ...prevData, carb }))}
              type="carb"
            />
          </div>
          <div className='input-field'>
            <label>Date: 
              <input className="input" type="date" name="date" value={formData.date} onChange={handleChange} required />
            </label>
          </div>
        </div>
        <div className='button-group'>
          <button className='secondary-button' onClick={handleCancel}>Cancel</button>
          <button className='primary-button' type="submit">Save</button>
        </div>
      </form>
    </div>
  )
};

export default FoodForm
