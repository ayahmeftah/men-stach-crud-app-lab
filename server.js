const Book = require('./models/Book')
const mongoose = require('mongoose')
const express = require("express")
const dotenv = require("dotenv").config()
const app = express()
const methodOverride = require('method-override')
const morgan = require('morgan')

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

app.get('/books', async (req,res)=>{
    try {
        const allBooks = await Book.find()
        res.render("allBooks.ejs",{allBooks:allBooks})
    } catch (error) {
        console.log("Error, can't display all books")
    }
})

app.get("/books/create", async (req, res) => {
    res.render("create.ejs")
})

app.post("/books/create", async (req, res) => {
    try {
        await Book.create(req.body)
        res.redirect("/books")
    } catch (error) {
        console.log(error)
    }
})

app.get("/books/:bookId", async (req, res) => {
    const foundBook = await Book.findById(req.params.bookId)
    res.render("booksDetails.ejs",{foundBook:foundBook})
})

app.delete('/books/delete/:bookId', async (req, res) =>{
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.bookId);
        res.redirect("/books")
    } catch (error) {
        console.log("error")
    }
})

//Update

app.get("/books/update/:id", async (req,res)=>{
    try {
        const foundBook = await Book.findById(req.params.id)
        res.render('bookUpdate.ejs',{foundBook})
    } catch (error) {
        console.log(error)
    }
})

app.put("/books/update/:id", async (req,res)=>{

    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id,req.body)
        res.redirect(`/books/${req.params.id}`)
    } catch (error) {
        console.log(error)
    }
})


app.listen(3000)