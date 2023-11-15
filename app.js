// Imports
const express = require('express');
const mongoose = require("mongoose");
const conncectDB = require('./db');
const session = require("express-session");
const app = express();
const controller = require('./controllers/controller')
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require( 'body-parser' );
const port = 3000;

// Connect to MongoDB
connectDB();

// db.js
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/userInfo', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

module.exports = connectDB;

// Middleware
app.use(bodyParser.json());
app.set('view engine', 'ejs');

// Routes
app.get('/', controller.getIndex);
app.post('/addPerson', controller.addperson);
app.get('/people', controller.addperson);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

