const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./router/userRoute');
const bookRoutes = require('./router/bookRoute');
const dotenv = require('dotenv').config();
const asyncErrors = require('express-async-errors');

const app = express();
app.use(express.json());

mongoose.connect(process.env.mongoUrl)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error.message);
    });

app.use('/users', userRoutes);
app.use('/books', bookRoutes);

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});