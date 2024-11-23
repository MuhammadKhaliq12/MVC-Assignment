const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const BooksSchema = new Schema({
    title: { type: String, required: true, unique: true, defa },
    author: String,
    genre: String,
    publication_year: Number,
    pages: Number,
    read: Boolean

})

const Book = mongoose.model('Book', BooksSchema)

module.exports = Book;