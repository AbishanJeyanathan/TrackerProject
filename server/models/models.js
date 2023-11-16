// models/models.js
// Defined Mongoose Model
const mongoose = require('mongoose');

const modelsSchema = new mongoose.Schema({
    Playername: String,
    Playerheight: Number,
    Playerposition: String,
});

const Person = mongoose.model('Person', modelsSchema);

module.exports = Person;
