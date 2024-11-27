const Book = require('../models/bookModel');

const addBook = async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json({ message: "Book created successfully", book });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getSingleBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addBook,
    getSingleBook,
};