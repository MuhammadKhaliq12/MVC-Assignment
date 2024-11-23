const Book = require('../models/user');


const addBook = async (req, res) => {

    const data = req.body
    const object = await Book.create(data)
    res.json({ "message": "Object created successfully", object })
}

const getSingleBook = async (req, res) => {
    const id = req.params.id
    const object = await Book.findById({ _id: id })
    res.json({ "message": "Object created successfully", object })
}

module.exports = {
    addBook,
    getSingleBook
}