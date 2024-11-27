const express = require('express');
const router = express.Router();
const controller = require('../controller/bookController');

router.post('/addBook', controller.addBook);
router.get('/:id', controller.getSingleBook);

module.exports = router;