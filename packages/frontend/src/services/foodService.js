import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/foods'

const getAllFoods = () => {
  return axios.get(baseUrl)
}

const newFood = newObject => {
  return axios.post(baseUrl, newObject)
}

const updateFood = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const deleteFood = (id) => {
	return axios.delete(`${baseUrl}/${id}`);
};

export default { 
  getAllFoods: getAllFoods, 
  newFood: newFood, 
  updateFood: updateFood,
  deleteFood: deleteFood 
}