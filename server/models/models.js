// models/person.js
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    Playername: String,
    Playerheight: Number,
    Playerposition: String,
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
