const express = require('express');
const Driver = require('../../db/models/driver');
const driverSchema = require('../../joiSchemas/userSchema');
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

router.post('/drivers', (req, res) => {
    const { error, value } = driverSchema.validate(req.body);
    if (error)
        res.status(400).json({ error: error.details[0].message })
    else {
        const driver = new Driver(value);
        driver.save()
            .then(() => { res.json({ status: 'new driver created' }) })
            .catch(e => { res.status(500).json({ error: e.message }) });
    }
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