/* eslint-disable react/prop-types */
import { useState } from 'react';
// import Creatable from 'react-select/creatable';
import ProteinSelect from './ProteinSelect';
import CarbSelect from './CarbSelect';


const AddNewFood = ({ handleCreate, foods }) => {
    const [name, setName] = useState('')
    const [protein, setProtein] = useState(null)
    const [carb, setCarb] = useState(null)
    const [date, setDate] = useState('')
  
    const handleSubmit = (e) => {
      e.preventDefault()
      handleCreate({ name, protein: protein?.value, carb: carb?.value, date })
      setName('')
      setProtein(null)
      setCarb(null)
      setDate('')
    }

    return (
      <><h2>Add new food</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:<input type="text" value={name} onChange={(e) => setName(e.target.value)} required /></label>
        </div>
        <div>
          <ProteinSelect
            foods={foods} 
            protein={protein} 
            setProtein={setProtein}
          />
        </div>
        <div>
          <CarbSelect
            foods={foods} 
            carb={carb} 
            setCarb={setCarb}
          />
        </div>
        <div>
          <label>Date: <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required /></label>
        </div>
        <button type="submit">Add Food</button>
      </form></>
    );
  };

export default AddNewFood;