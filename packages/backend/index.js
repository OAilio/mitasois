require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const Food = require("./models/food")

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))


// Methods

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

//Get all foods
app.get('/api/foods', (request, response) => {
  Food.find({}).then(foods => {
    response.json(foods)
  })
})

// Get single food by ID
app.get('/api/foods/:id', (request, response, next) => {
  Food.findById(request.params.id)
    .then(food => {
      if (food) {
        response.json(food)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// Delete a food
app.delete('/api/foods/:id', (request, response) => {
  Food.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// Create new food
app.post('/api/foods', (request, response, next) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  const food = new Food({
    name: body.name,
    protein: body.protein,
    carb: body.carb,
    date: body.date
  })

  food.save().then(savedFood => {
    response.json(savedFood)
  })
  .catch(error => next(error))
})

// Edit a food by ID
app.put('/api/foods/:id', (request, response, next) => {
  const { name, protein, carb, date} = request.body

  const food = {
    name,
    protein,
    carb,
    date
  }

  Food.findByIdAndUpdate(request.params.id, food,
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedFood => {
      response.json(updatedFood)
    })
    .catch(error => next(error))
})


// Error states

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})