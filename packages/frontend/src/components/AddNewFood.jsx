/* eslint-disable react/prop-types */
import { useState } from 'react';
import FoodForm from './FoodForm';

const AddNewFood = ({ handleCreate, foods }) => {
    const [formData, setFormData] = useState({ name: '', protein: null, carb: null, date: '' });
    
    return (
      <>
      <h2>Add new food</h2>
      <FoodForm
        formData={formData}
        setFormData={setFormData}
        submit={handleCreate}
        foods={foods}
      />
      </>
    );
  };

export default AddNewFood;