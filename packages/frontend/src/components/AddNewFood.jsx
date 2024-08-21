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
  
  // addFormOpen defines whether the button is expanded to the form or not
  return (
    <> 
    {!addFormOpen ? (
    <div className='new-food-container' onClick={openForm}>
      <div className='item-content'>+ Add new food</div>
    </div>
    ) : (
    <div className='new-food-container open'>
      <div className='form-padding-container'>
      <div className='item-content'>+ Add new food</div>
        <FoodForm
          formData={formData}
          setFormData={setFormData}
          submit={handleCreate}
          foods={foods}
          setAddFormOpen={setAddFormOpen}
        /> 
      </div>
    
    </div>)}
    </>
  );
};

export default AddNewFood;