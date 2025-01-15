const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const db = require('./db/db');
const app = express();

db();
app.get('/', (req, res) => {
    res.send('Hello, World!');
})

module.exports = app;