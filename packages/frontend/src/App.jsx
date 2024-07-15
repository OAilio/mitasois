/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import foodService from './services/foodService';

import './css/body.scss'

import Toolbar from './components/toolbar/Toolbar';
import AddNewFood from './components/AddNewFood';
import AllFoods from './components/AllFoods';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [foods, setFoods] = useState([]);
  const [activeFood, setActiveFood] = useState(null);
  const [editingFood, setEditingFood] = useState(null)
  const [ascendingSort, setAscendingSort] = useState(false)
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("")

  // Filters
  const [proteinFilters, setProteinFilters] = useState([]);
  const [carbFilters, setCarbFilters] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [dateFilterType, setDateFilterType] = useState('Before');


  // Fetch food data
  useEffect(() => {
    foodService.getAllFoods()
      .then(response => {
        console.log("Promise fulfilled")
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
    <Toolbar 
      ascendingSort={ascendingSort} 
      setAscendingSort={setAscendingSort} 
      searchInput={searchInput} 
      setSearchInput={setSearchInput} 
      foods={foods}
      handleUpdate={handleUpdate} 
      proteinFilters={proteinFilters} 
      setProteinFilters={setProteinFilters} 
      carbFilters={carbFilters} 
      setCarbFilters={setCarbFilters} 
      dateFilter={dateFilter} 
      setDateFilter={setDateFilter} 
      dateFilterType={dateFilterType} 
      setDateFilterType={setDateFilterType}
      setActiveFood={setActiveFood}
    />
    <AddNewFood 
      handleCreate={handleCreate}
      foods={foods}
    />
    <AllFoods 
      foods={foods}
      ascendingSort={ascendingSort}
      searchInput={searchInput}
      handleDelete={handleDelete}
      handleUpdate={handleUpdate}
      proteinFilters={proteinFilters}
      carbFilters={carbFilters}
      dateFilter={dateFilter}
      dateFilterType={dateFilterType}
      editingFood={editingFood}
      setEditingFood={setEditingFood}
      activeFood={activeFood}
      setActiveFood={setActiveFood}
    />
    {/* <Footer /> */}
    </>
  );
}

export default App;