/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import foodService from './services/foodService';

import Toolbar from './components/Toolbar';
import AddNewFood from './components/AddNewFood';
import AllFoods from './components/AllFoods';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [foods, setFoods] = useState([]);
  const [ascendingSort, setAscendingSort] = useState(false)
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    foodService.getAllFoods()
      .then(response => {
        setFoods(response.data);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  const handleCreate = (newFood) => {
    foodService.createNewFood(newFood)
      .then(response => {
        setFoods(foods.concat(response.data));
      })
      .catch(error => {
        setError(error);
      });
  };

  const handleUpdate = (id, updatedFood) => {
    foodService.updateFood(id, updatedFood)
      .then(response => {
        setFoods(foods.map(food => (food.id === id ? response.data : food)));
      })
      .catch(error => {
        setError(error);
      });
  };

  const handleDelete = (id) => {
    foodService.deleteFood(id)
      .then(() => {
        setFoods(foods.filter(food => food.id !== id));
      })
      .catch(error => {
        setError(error);
      });
  };


  if (error) return <p>Error: {error.message}</p>

  return (
    <>
    <Header />
    <Toolbar ascendingSort={ascendingSort} setAscendingSort={setAscendingSort} setSearchInput={setSearchInput}/>
    <AddNewFood handleCreate={handleCreate}/>
    <AllFoods foods={foods} ascendingSort={ascendingSort} searchInput={searchInput} handleDelete={handleDelete} handleUpdate={handleUpdate}/>
    <Footer />
    </>
  );
}

export default App;
