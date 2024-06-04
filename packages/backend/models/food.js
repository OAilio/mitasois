const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

//------------------------------
// TODO: Schema content & validation rules
//------------------------------
const foodSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    minLength: 2
  },
  protein: String,
  carb: String,
  date: String,
})

foodSchema.set('toJSON', {
transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Food', foodSchema)