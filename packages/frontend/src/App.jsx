/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';
import foodService from './services/foodService';

function Header(){
  return (
    <h1>Mitäsöis</h1>
  )
}
function Navigation(){
  return (
    <h2>Navigointi</h2>
  )
}

function NewDish(){
  return (
    <button>+ Add new dish</button>
  )
}

function Footer(){
  return (
    <h4>Meitsin nimi</h4>
  )
}

function App() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    foodService.getAllFoods()
      .then(response => {
        setFoods(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the foods!', error);
      });
  }, []);

  return (
    <>
    <Header />
    <Navigation />
    <NewDish />
    <div>
      <ul>
        {foods.map(food => (
          <li key={food.id}>{food.name} - {food.date}</li>
        ))}
      </ul>
    </div>
    <Footer />
    </>
  );
}

export default App;
