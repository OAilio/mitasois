/* eslint-disable react/prop-types */
import { useState } from 'react';

const AddNewFood = ({ handleCreate }) => {
    const [name, setName] = useState('');
    const [mainProtein, setMainProtein] = useState('');
    const [mainCarb, setMainCarb] = useState('');
    const [date, setDate] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      handleCreate({ name, mainProtein, mainCarb, date });
      setName('');
      setMainProtein('');
      setMainCarb('');
      setDate('');
    };
  
    return (
      <><h2>Add new food</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:<input type="text" value={name} onChange={(e) => setName(e.target.value)} required /></label>
        </div>
        <div>
          <label>Main Protein:<input type="text"value={mainProtein} onChange={(e) => setMainProtein(e.target.value)} required /></label>
        </div>
        <div>
          <label>Main Carb:<input type="text"value={mainCarb} onChange={(e) => setMainCarb(e.target.value)} required /></label>
        </div>
        <div>
          <label>Date: <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required /></label>
        </div>
        <button type="submit">Add Food</button>
      </form></>
    );
  };

export default AddNewFood;