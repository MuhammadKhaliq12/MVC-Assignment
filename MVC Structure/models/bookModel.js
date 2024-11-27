const mongoose = require('mongoose');
const { Schema } = mongoose;

const BooksSchema = new Schema({
    title: { type: String, required: true },
    author: String,
    genre: String,
    publication_year: Number,
    pages: Number,
    read: Boolean
});

const Book = mongoose.model('Book', BooksSchema);
module.exports = Book;