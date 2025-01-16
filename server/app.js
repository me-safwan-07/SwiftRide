const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');

const userRoutes = require('./routes/user.routes')

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
})

app.use('/api/user', userRoutes)

module.exports = app;