// Imports
const express = require('express');
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();
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
    app.use(express.static('public'));
    // Specific folder example
    app.use('/css', express.static(__dirname + '/public/css'));
    app.use('/js', express.static(__dirname + '/public/js'));
    app.use('/img', express.static(__dirname + '/public/images'));

    // Set View's
    app.set('views', './views');
    app.set('view engine', 'ejs');

    // Navigation
    app.get('', (req, res) => {
      res.render('home', { text: 'Hey' });
    });

    app.get('/about', (req, res) => {
      res.sendFile(__dirname + '/views/about.html');
    });

    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error Connecting to MongoDB:', error.message);
  }
})();
