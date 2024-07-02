/* eslint-disable react/prop-types */
import { useState } from 'react';
import FoodForm from './FoodForm';

const AddNewFood = ({ handleCreate, foods }) => {
  const [addFormOpen, setAddFormOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', protein: null, carb: null, date: '' });

  const openForm = () => {
    setAddFormOpen(true)
  }
  
  // addFormOpen defines whether the button is expanded to the form or not
  return (
    <>
    {!addFormOpen && 
      <button onClick={openForm}>Add new food</button>}
    {addFormOpen &&
    <FoodForm
      formData={formData}
      setFormData={setFormData}
      submit={handleCreate}
      foods={foods}
      setAddFormOpen={setAddFormOpen}
    />
    }
    </>
  );
};

export default AddNewFood;