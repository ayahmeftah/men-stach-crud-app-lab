const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
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
    },
    image: {
        type: String,
        required: true
    }
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book