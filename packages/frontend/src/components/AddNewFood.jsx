/* eslint-disable react/prop-types */
import { useState } from 'react';

const AddNewFood = ({ handleCreate }) => {
    const [name, setName] = useState('');
    const [protein, setProtein] = useState('');
    const [carb, setCarb] = useState('');
    const [date, setDate] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      handleCreate({ name, protein, carb, date });
      setName('');
      setProtein('');
      setCarb('');
      setDate('');
    };
    //TODO select for protein and carb
    return (
      <><h2>Add new food</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:<input type="text" value={name} onChange={(e) => setName(e.target.value)} required /></label>
        </div>
        <div>
          <label>Main Protein:<input type="text"value={protein} onChange={(e) => setProtein(e.target.value)} required /></label>
        </div>
        <div>
          <label>Main Carb:<input type="text"value={carb} onChange={(e) => setCarb(e.target.value)} required /></label>
        </div>
        <div>
          <label>Date: <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required /></label>
        </div>
        <button type="submit">Add Food</button>
      </form></>
    );
  };

export default AddNewFood;