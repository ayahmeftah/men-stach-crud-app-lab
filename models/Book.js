const {Schema, model} = require('mongoose')

const bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        enum: [1,2,3,4,5]
    }
})

const Book = model('Book', bookSchema)

module.exports = Book