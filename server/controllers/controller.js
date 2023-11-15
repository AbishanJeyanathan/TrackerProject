// controllers/personController.js
const Person = require('../models/person');

exports.getIndex = (req, res) => {
    res.render('index');
};

exports.addPerson = (req, res) => {
    const { name, height, position } = req.body;

    if (!name || !height || !position) {
        return res.status(400).json({ error: 'Name, height, and position are required' });
    }

    const newPerson = new Person({
        Playername: name,
        Playerheight: height,
        Playerposition: position,
    });

    newPerson.save((err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.redirect('/people');
        }
    });
};

exports.getPeople = (req, res) => {
    Person.find({}, (err, people) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.render('people', { people: people });
        }
    });
};
