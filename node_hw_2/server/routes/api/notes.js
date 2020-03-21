//const jwt = require('jsonwebtoken');
const express = require('express');
const fs = require('fs');
const router = express.Router();
let notes = JSON.parse(fs.readFileSync('notes.json', 'utf8'));

const secret = require('../../config/auth').secret;

router.get('/notes', (req, res) => {
    getPersonalNotes(req, res);
});

router.post('/notes', (req, res) => {
    const { name, description } = req.body;
    const newId = Math.max(...notes.map(note => note.id), 0) + 1;
    notes.push({ id: newId, name, description, userId: req.user.id, done: false })
    saveNotes(notes);
    getPersonalNotes(req, res);
});

router.delete('/notes/:id', (req, res) => {
    const id  = req.params.id;
    var index = notes.indexOf(notes.find(n => n.id == id));
    if (index !== -1) notes.splice(index, 1);
    saveNotes(notes);
});

router.put('/notes', (req, res) => {
    const { id, name, description, done } = req.body;
    let noteToChange = notes.find(n => n.id == id);
    noteToChange.name = name;
    noteToChange.description = description;
    noteToChange.userId = req.user.id;
    noteToChange.done = done;
    saveNotes(notes);
    //res.json("Got a PUT request at /notes");
});

function saveNotes(notes) {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
}

function getPersonalNotes(req, res) {
    let personalNotes = notes.filter(note => note.userId == req.user.id);
    res.json({
        notes: personalNotes,
        count: personalNotes.length,
        status: "ok"
    });
}
// router.put('/notes', (req, res) => {
//     const { id } = req.body;
//     let noteToChange = notes.find(n => n.id == id);
//     noteToChange.done = !noteToChange.done;
//     res.redirect('/api/notes');
// });

module.exports = router;