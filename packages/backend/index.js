const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

let foods = [
    {
      id: 1,
      name: "Kalapuikot",
      protein: "Seafood",
      carb: "Vegetable",
      date: "21/5/2024"
    },
    {
        id: 2,
        name: "Nachovuoka",
        protein: "Chicken",
        carb: "Other",
        date: "19/5/2024"
    },
    {
        id: 3,
        name: "Tofuwokki",
        protein: "Vegetable",
        carb: "Noodles",
        date: "15/5/2024"
    }
  ]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/foods', (request, response) => {
    response.json(foods)
})

app.get('/api/foods/:id', (request, response) => {
    const id = Number(request.params.id)
    const food = foods.find(food => food.id === id)
    if (food) {
        response.json(food)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/foods/:id', (request, response) => {
    const id = Number(request.params.id)
    food = foods.find(food => food.id === id)
  
    response.status(204).end()
})

const generateId = () => {
    const maxId = foods.length > 0
      ? Math.max(...foods.map(n => n.id))
      : 0
    return maxId + 1
}

app.post('/api/foods', (request, response) => {
    const body = request.body

    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }
  
    const food = {
      id: generateId(),
      name: body.name,
      protein: body.protein,
      carb: body.carb,
      date: body.date
    }
  
    foods = foods.concat(food)
  
    response.json(food)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})