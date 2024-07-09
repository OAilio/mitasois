/* eslint-disable react/prop-types */
import { useState } from 'react';
import FoodForm from './FoodForm';
import '../css/addNewFood.scss'

const AddNewFood = ({ handleCreate, foods }) => {
  const [addFormOpen, setAddFormOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', protein: null, carb: null, date: '' });

  const openForm = () => {
    setAddFormOpen(true)
  }

  console.log("addFormOpen:", addFormOpen)
  
  // addFormOpen defines whether the button is expanded to the form or not
  return (
    <> 
    {!addFormOpen ? (
    <div className='food-item-container' onClick={openForm}>
      <div className='item-content'>+ Add new food</div>
    </div>
    ) : (
    <div className='food-item-container active'>
      <div className='item-content'>+ Add new food</div>
      <FoodForm
        formData={formData}
        setFormData={setFormData}
        submit={handleCreate}
        foods={foods}
        setAddFormOpen={setAddFormOpen}
      />    
    </div>)}
    </>
  );
};

export default AddNewFood;