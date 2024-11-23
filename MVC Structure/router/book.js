const express = require('express')
const router = express.Router()
const controller = require('../controller/book')




router.post('/book', controller.addBook)
router.get('/books/:id', controller.getSingleBook)


module.exports = router