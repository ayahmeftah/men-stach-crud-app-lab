const Book = require('./models/Book')
const mongoose = require('mongoose')
const express = require("express")
const dotenv = require("dotenv").config()
const app = express()

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

// app.delete('/books/:bookId', async (req, res) =>{
//     try {
//         const deletedBook = await Book.findByIdAndDelete(req.params.bookId);
        
//         if (!deletedBook) {
//             console.log("Book not found")
//         }else{
//             console.log("Book deleted")
//         }

//     } catch (error) {
//         console.log("error")
//     }
// })


app.listen(3000)