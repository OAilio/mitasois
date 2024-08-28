/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import foodService from './services/foodService';

import './css/body.scss'

import Toolbar from './components/toolbar/Toolbar';
import AddNewFood from './components/AddNewFood';
import AllFoods from './components/AllFoods';
import Header from './components/Header';
import PopUpMessage from './components/PopUpMessage';
import LoadingScreen from './components/LoadingScreen';
import ErrorScreen from './components/ErrorScreen';

function App() {
  const [foods, setFoods] = useState([]); // List of foods
  const [activeFood, setActiveFood] = useState(null); // Food that's currently open
  const [editingFood, setEditingFood] = useState(null) // Food that's currently being edited
  const [ascendingSort, setAscendingSort] = useState(false) // Sort direction
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("")
  const [message, setMessage] = useState(null) // Pop-up message content
  const [messageHeading, setMessageHeading] = useState(null) // Pop-up message heading
  const [loading, setLoading] = useState(true); // Is page loading

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
        setLoading(false);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  const handleCreate = (newFood, heading) => {
    foodService.createNewFood(newFood)
      .then(response => {
        setFoods(foods.concat(response.data));
        setMessageHeading(heading)
        setMessage(`${newFood.name} was added to your foods!`)
      })
      .catch(error => {
        setError(error);
      });
  };

  const handleUpdate = (id, updatedFood, heading) => {
    foodService.updateFood(id, updatedFood)
      .then(response => {
        setFoods(foods.map(food => (food.id === id ? response.data : food)));
        setMessageHeading(heading)
        setMessage(`${updatedFood.name} was updated successfully!`)
      })
      .catch(error => {
        setError(error);
      });
  };

  const handleDelete = (id) => {
    foodService.deleteFood(id)
      .then(() => {
        setFoods(foods.filter(food => food.id !== id));
        setMessageHeading(null)
        setMessage(`Food deleted successfully!`)
      })
      .catch(error => {
        setError(error);
      });
  };

  if (error) { return <ErrorScreen error={error} />; }

  if (loading) { return <LoadingScreen />; }

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
      setMessage={setMessage}
      setMessageHeading={setMessageHeading}
    />      
    <AddNewFood 
      handleCreate={handleCreate}
      foods={foods}
      setActiveFood={setActiveFood}
      setEditingFood={setEditingFood}
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
    <PopUpMessage
      message={message}
      setMessage={setMessage}
      messageHeading={messageHeading}
      setMessageHeading={setMessageHeading}
    />
    </>
  );
}

export default App;