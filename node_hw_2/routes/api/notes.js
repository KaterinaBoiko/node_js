//const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const secret = require('../../config/auth').secret;

let notes = [
    { id: 1, name: 'Cook', description: 'Make a breakfast', userId: 1, done: false },
    { id: 2, name: 'HW', description: 'Do your homework', userId: 1, done: false },
    { id: 3, name: 'Node', description: 'Rewatch the last lesson', userId: 1, done: false },
    { id: 4, name: 'Cleaning', description: 'Wash the dishes', userId: 1, done: false },
    { id: 5, name: 'Dog', description: 'have a walk with your dog', userId: 2, done: false },
    { id: 6, name: 'Book', description: 'Finish the book', userId: 2, done: false },
]

router.get('/notes', (req, res) => {
    let personalNotes = notes.filter(note => note.userId == req.user.id);

    res.json({
        notes: personalNotes,
        count: personalNotes.length,
        status: "ok"
    });
});

router.post('/notes', (req, res) => {
    const { name, description } = req.body;
    const newId = Math.max(...notes.map(note => note.id), 0) + 1;
    notes.push({ id: newId, name, description, userId: req.user.id, done: false })
    res.redirect('/api/notes');
});

router.delete('/notes', (req, res) => {
    const { id } = req.body;
    var index = notes.indexOf(notes.find(n => n.id == id));
    if (index !== -1) notes.splice(index, 1);
    res.redirect('/api/notes');
});

router.put('/notes', (req, res) => {
    const { id, name, description, userId, done } = req.body;
    let noteToChange = notes.find(n => n.id == id);
    noteToChange.name = name;
    noteToChange.description = description;
    noteToChange.userId = userId;
    noteToChange.done = done;
    console.log(noteToChange);
    console.log(notes[0]);
    res.redirect('/api/notes');
});


// router.put('/notes', (req, res) => {
//     const { id } = req.body;
//     let noteToChange = notes.find(n => n.id == id);
//     noteToChange.done = !noteToChange.done;
//     res.redirect('/api/notes');
// });



module.exports = router;