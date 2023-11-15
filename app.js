// Imports
const express = require('express');
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require( 'body-parser' );
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userInfo', { useNewUrlParser: true, useUnifiedTopology: true });
const personSchema = new mongoose.Schema({
    Playername: String,
    Playerheight: Number,
    Playerposition: String,
});
const Person = mongoose.model('Person', personSchema);

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
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/addPerson', (req, res) => {
  const { Playername, Playerheight, Playerposition } = req.body;

  if (!Playername || !Playerheight || !Playerposition) {
      return res.status(400).json({ error: 'Name, height, and position are required' });
  }

  const newPerson = new Person({
      name: Playername,
      height: Playerheight,
      position: Playerposition,
  });

  newPerson.save((err) => {
      if (err) {
          res.status(500).send(err);
      } else {
          res.redirect('/people');
      }
  });
});

app.get('/people', (req, res) => {
  Person.find({}, (err, people) => {
      if (err) {
          res.status(500).send(err);
      } else {
          res.render('people', { people: people });
      }
  });
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

