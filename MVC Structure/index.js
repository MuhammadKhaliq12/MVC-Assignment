const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./router/user');
const asyncErrors = require('express-async-errors');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/User')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error.message);
    });

app.use('/users', userRoutes);

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});