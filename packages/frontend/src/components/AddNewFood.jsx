/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import FoodForm from './FoodForm';
import '../css/addNewFood.scss'

const AddNewFood = ({ handleCreate, foods, setActiveFood, setEditingFood }) => {
  const [addFormOpen, setAddFormOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', protein: null, carb: null, date: '' });
  const formRef = useRef(null);

  const openForm = () => {
    setAddFormOpen(true)
  }

  useEffect(() => {
    if (addFormOpen && formRef.current) {
      const elementTop = formRef.current.getBoundingClientRect().top + window.scrollY;
      const marginTop = parseFloat(getComputedStyle(document.documentElement).fontSize); // Convert 1rem to pixels

      // Scroll the whole page to bring the form into view with a margin of 1rem
      window.scrollTo({
        top: elementTop - marginTop,
        behavior: 'smooth',
      });
    } else {
      // If the form is not open, scroll to the top of the page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [addFormOpen]);
  
  // addFormOpen defines whether the button is expanded to the form or not
  return (
    <> 
    {!addFormOpen ? (
    <div className='new-food-container' onClick={openForm} title="Click here to add a new food">
      <div className='item-content'>+ Add new food</div>
    </div>
    ) : (
    <div className='new-food-container open' ref={formRef}>
      <div className='form-padding-container'>
      <div className='item-content'>+ Add new food</div>
        <FoodForm
          formData={formData}
          setFormData={setFormData}
          submit={handleCreate}
          foods={foods}
          addFormOpen={addFormOpen}
          setAddFormOpen={setAddFormOpen}
          setActiveFood={setActiveFood}
          setEditingFood={setEditingFood}
        /> 
      </div>
    
    </div>)}
    </>
  );
};

export default AddNewFood;