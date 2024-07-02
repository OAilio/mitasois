/* eslint-disable react/prop-types */
// import { useState } from "react";
import IngredientSelect from './IngredientSelect';

const FoodForm = ({formData, setFormData, submit, foods, setEditing, setAddFormOpen}) => {

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
      setEditing(null)
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
      setEditing(null)
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
        <div>
          <label>Name:<input type="text" name="name" value={formData.name} onChange={handleChange} required /></label>
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
        <div>
          <label>Date: <input type="date" name="date" value={formData.date} onChange={handleChange} required /></label>
        </div>
				<button onClick={handleCancel}>Cancel</button>
        <button type="submit">Save</button>
      </form>
    </div>
  )
};

export default FoodForm
