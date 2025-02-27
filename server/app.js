const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');

const userRoutes = require('./routes/user.routes')
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/map.routes');
const errorHandler = require('./middlewares/errorHandler.middleware');
const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Hello, World!');
})

app.use('/api/user', userRoutes)
app.use('/api/captain', captainRoutes)
app.use('/api/maps', mapsRoutes);

module.exports = app;