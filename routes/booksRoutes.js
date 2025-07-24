const Book = require('../models/Book')
const router = require("express").Router()

router.get('/', async (req,res)=>{
    try {
        const allBooks = await Book.find()
        res.render("allBooks.ejs",{allBooks:allBooks})
    } catch (error) {
        console.log("Error, can't display all books")
    }
})

router.get("/create", async (req, res) => {
    res.render("create.ejs")
})

router.post("/create", async (req, res) => {
    try {
        await Book.create(req.body)
        res.redirect("/books")
    } catch (error) {
        console.log(error)
    }
})

router.get("/:bookId", async (req, res) => {
    const foundBook = await Book.findById(req.params.bookId)
    res.render("booksDetails.ejs",{foundBook:foundBook})
})

router.delete('/delete/:bookId', async (req, res) =>{
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.bookId);
        res.redirect("/books")
    } catch (error) {
        console.log("error")
    }
})

router.get("/update/:id", async (req,res)=>{
    try {
        const foundBook = await Book.findById(req.params.id)
        res.render('bookUpdate.ejs',{foundBook})
    } catch (error) {
        console.log(error)
    }
})

router.put("/update/:id", async (req,res)=>{

    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id,req.body)
        res.redirect(`/books/${req.params.id}`)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router