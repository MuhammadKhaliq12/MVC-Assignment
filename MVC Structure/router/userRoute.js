const express = require('express');
const router = express.Router();
const controller = require('../controller/userController');

router.post('/', controller.createUser);
router.get('/allUsers', controller.getAllUsers);
router.get('/:id', controller.getUserById);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);

router.get('/logIn', controller.logIn)
router.post('/:id/borrow/:bookId', controller.borrowBook);
router.post('/:id/return/:bookId', controller.returnBook);
router.get('/:id/borrowedBooks', controller.viewBorrowedBooks);

module.exports = router;