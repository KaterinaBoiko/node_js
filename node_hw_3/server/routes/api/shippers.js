const express = require('express');
const Shipper = require('../../db/models/shipper');
const shipperSchema = require('../../joiSchemas/userSchema');
const bcrypt = require("bcrypt");
const router = express.Router();

router.get('/shippers', (req, res) => {
    Shipper.find({})
        .then(shippers => res.json({ status: 'ok', shippers }))
        .catch(e => { res.status(500).json({ error: e.message }) })
});

router.get('/shippers/:id', (req, res) => {
    Shipper.findById(req.params.id)
        .then(shipper => res.json({ status: 'ok', shipper }))
        .catch(e => { res.status(500).json({ error: e.message }) })
});

router.post('/shippers', async (req, res) => {
    const { error, value } = shipperSchema.validate(req.body);
    if (error)
        return res.status(400).json({ error: error.details[0].message })

    const shipper = new Shipper(value);
    await bcrypt
        .hash(shipper.password, 10)
        .then(hash => shipper.password = hash)
        .catch(err => res.status(500).json({ error: err.message }))

    shipper.save()
        .then(() => { res.redirect(307, '/api/login') })
        .catch(e => { res.status(500).json({ error: e.message }) });
});

router.delete('/shippers/:id', (req, res) => {
    Shipper.findByIdAndDelete(req.params.id)
        .then(() => res.json({ status: 'ok' }))
        .catch(e => { res.status(500).json({ error: e.message }) })
});

router.put('/shippers/:id', (req, res) => {
    const { error, value } = shipperSchema.validate(req.body);
    if (error)
        res.status(400).json({ error: error.details[0].message })
    else {
        Shipper.findByIdAndUpdate(req.params.id, value, { new: true })
            .then(shipper => res.json({ status: 'ok', shipper }))
            .catch(e => { res.status(500).json({ error: e.message }) })
    }
});

module.exports = router;