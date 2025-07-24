const Book = require('./models/Book')
const mongoose = require('mongoose')
const express = require("express")
const dotenv = require("dotenv").config()
const app = express()
const methodOverride = require('method-override')
const morgan = require('morgan')
const booksRoutes = require('./routes/booksRoutes')

// Middleware
app.use(methodOverride("_method"))
app.use(morgan("dev"))
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Database")
    } catch (error) {
        console.log("Error connecting to the database")
    }
}

connectToDB()


app.use("/books",booksRoutes)

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log("Listening on port "+port)
})