const express = require('express');
const Load = require('../../db/models/load');
const loadSchema = require('../../joiSchemas/loadSchema');
const router = express.Router();

router.get('/loads', (req, res) => {
    Load.find({})
        .then(loads => res.json({ status: 'ok', loads }))
        .catch(e => { res.status(500).json({ error: e.message }) })
});

router.get('/loads/:id', (req, res) => {
    Load.findById(req.params.id)
        .then(load => res.json({ status: 'ok', load }))
        .catch(e => { res.status(500).json({ error: e.message }) })
});

router.post('/loads', (req, res) => {
    const { error, value } = loadSchema.validate(req.body);
    if (error)
        res.status(400).json({ error: error.details[0].message })
    else {
        const load = new Load(value);
        load.save()
            .then(() => { res.json({ status: 'new load created' }) })
            .catch(e => { res.status(500).json({ error: e.message }) });
    }
});

router.delete('/loads/:id', (req, res) => {
    Load.findByIdAndDelete(req.params.id)
        .then(() => res.json({ status: 'ok' }))
        .catch(e => { res.status(500).json({ error: e.message }) })
});

router.put('/loads/:id', (req, res) => {
    const { error, value } = loadSchema.validate(req.body);
    if (error)
        res.status(400).json({ error: error.details[0].message })
    else {
        Load.findByIdAndUpdate(req.params.id, value, { new: true })
            .then(truck => res.json({ status: 'ok', truck }))
            .catch(e => { res.status(500).json({ error: e.message }) })
    }
});

module.exports = router;