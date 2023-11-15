// Imports
const express = require('express');
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const port = 3000;

// database connection
(async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Assignment3", { useNewUrlParser: true });
    console.log('Successfully Connected to MongoDB');

    const db = mongoose.connection;
    db.on('error', (error) => console.log(error));
    db.once('open', () => console.log('Successfully Connected to the Database'));

    // Static Files
    app.use(express.urlencoded( { extended: true} ))
    app.use(express.static('public'));
    app.use(expressLayouts)

    app.use(cookieParser('CookingBlogSecure'));
    app.use(session({
    secret: 'CookingBlogSecretSession',
    saveUninitialized: true,
    resave: true
  }));
    app.use(flash());
    app.use(fileUpload());

    // Set View's
    app.set('layout', './layouts/home');
    app.set('view engine', 'ejs');
    // Routes
    const routes = require('./server/routes/routes.js')
    app.use('/', routes);

    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error Connecting to MongoDB:', error.message);
  }
})();
