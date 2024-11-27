const User = require('../models/userModel');
const Book = require('../models/bookModel');

const MAX_BORROW_LIMIT = 3;


const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('bookId');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const logIn = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (passwrod == user.password && email == user.email) {
            return res.status(200).json({ message: "LogIn" })
        }
        else {
            return res.status(401).json({ message: "Invalid Credentials" })
        }

    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    };
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('bookId');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('bookId');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const borrowBook = async (req, res) => {
    const userId = req.params.id;
    const bookId = req.params.bookId;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.borrowedBooks.length >= MAX_BORROW_LIMIT) {
            return res.status(400).json({ message: 'Borrow limit exceeded' });
        }

        if (user.borrowedBooks.includes(bookId)) {
            return res.status(400).json({ message: 'Book already borrowed' });
        }

        user.borrowedBooks.push(bookId);
        await user.save();
        res.status(200).json({ message: 'Book borrowed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const returnBook = async (req, res) => {
    const userId = req.params.id;
    const bookId = req.params.bookId;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (!user.borrowedBooks.includes(bookId)) {
            return res.status(400).json({ message: 'This book was not borrowed by the user' });
        }

        user.borrowedBooks = user.borrowedBooks.filter(id => id.ObjectId() !== bookId);
        await user.save();
        res.status(200).json({ message: 'Book returned successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const viewBorrowedBooks = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId).populate('borrowedBooks');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user.borrowedBooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    borrowBook,
    returnBook,
    viewBorrowedBooks,
    logIn,
};