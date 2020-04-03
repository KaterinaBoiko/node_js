const express = require('express');
const Driver = require('../../db/models/driver');
const driverSchema = require('../../joiSchemas/userSchema');
const bcrypt = require("bcrypt");
const router = express.Router();

router.get('/drivers', (req, res) => {
    Driver.find({})
        .then(drivers => res.json({ status: 'ok', drivers }))
        .catch(e => { res.status(500).json({ error: e.message }) })
});

router.get('/drivers/:id', (req, res) => {
    Driver.findById(req.params.id)
        .then(driver => res.json({ status: 'ok', driver }))
        .catch(e => { res.status(500).json({ error: e.message }) })
});

router.post('/drivers', async (req, res) => {
    const { error, value } = driverSchema.validate(req.body);
    if (error)
        return res.status(400).json({ error: error.details[0].message })

    const driver = new Driver(value);
    await bcrypt
        .hash(driver.password, 10)
        .then(hash => driver.password = hash)
        .catch(err => res.status(500).json({ error: err.message }))

    driver.save()
        .then(() => { res.redirect(307, '/api/login') })
        .catch(e => { res.status(500).json({ error: e.message }) });
});

router.delete('/drivers/:id', (req, res) => {
    Driver.findByIdAndDelete(req.params.id)
        .then(() => res.json({ status: 'ok' }))
        .catch(e => { res.status(500).json({ error: e.message }) })
});

router.put('/drivers/:id', (req, res) => {
    const { error, value } = driverSchema.validate(req.body);
    if (error)
        res.status(400).json({ error: error.details[0].message })
    else {
        Driver.findByIdAndUpdate(req.params.id, value, { new: true })
            .then(driver => res.json({ status: 'ok', driver }))
            .catch(e => { res.status(500).json({ error: e.message }) })
    }
});

module.exports = router;