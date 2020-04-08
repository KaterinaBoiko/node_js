const express = require('express');
const Load = require('../../db/models/load');
const loadSchema = require('../../joiSchemas/loadSchema');
const router = express.Router();

router.get('/loads', (req, res) => {
    Load.find({ created_by: req.user._id })
        .then(loads => res.json({ status: 'ok', loads }))
        .catch(e => { res.status(500).json(e.message) })
});

router.get('/loads/:id', (req, res) => {
    Load.findById(req.params.id)
        .then(load => res.json({ status: 'ok', load }))
        .catch(e => { res.status(500).json(e.message) })
});

router.post('/loads', (req, res) => {
    const { error, value } = loadSchema.validate(req.body);
    if (error)
        res.status(400).json(error.details[0].message)
    else {
        const load = new Load(value);
        load.save()
            .then(() => { res.json({ status: 'new load created' }) })
            .catch(e => { res.status(500).json(e.message) });
    }
});

router.delete('/loads/:id', async (req, res) => {
    await Load.findById(req.params.id)
        .then(load => {
            if (load.status != 'new')
                return res.status(400).json('You can delete only NEW loads.')
        })
        .catch(e => { res.status(500).json(e.message) })

    Load.findByIdAndDelete(req.params.id)
        .then(() => res.json({ status: 'ok' }))
        .catch(e => { res.status(500).json(e.message) })
});

router.put('/loads/:id', (req, res) => {
    const { error, value } = loadSchema.validate(req.body);
    if (error)
        res.status(400).json(error.details[0].message)
    else {
        Load.findByIdAndUpdate(req.params.id, value, { new: true })
            .then(load => res.json({ status: 'ok', truck }))
            .catch(e => { res.status(500).json(e.message) })
    }
});

router.patch('/loads/:id/post', (req, res) => {
    const { error, value } = loadSchema.validate(req.body);
    if (error)
        return res.status(400).json(error.details[0].message);

    Load.findByIdAndUpdate(req.params.id, value, { new: true })
        .then(() => res.json({ status: 'Load status changed successfully' }))
        .catch(e => { res.status(500).json(e.message) })
})

module.exports = router;