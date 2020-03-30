const express = require('express');
const Driver = require('../../db/models/driver');
const router = express.Router();


router.get('/drivers', (req, res) => {
    Driver.find({})
        .then(drivers => res.json({ status: 'ok', drivers }))
        .catch(e => { res.status(500).json({ status: e.message }) })
});

router.get('/drivers/:id', (req, res) => {
    Driver.findById(req.params.id)
        .then(driver => res.json({ status: 'ok', driver }))
        .catch(e => { res.status(500).json({ status: e.message }) })
});

router.post('/drivers', (req, res) => {
    const driver = new Driver({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    driver.save()
        .then(() => { res.json({ status: 'new driver created' }) })
        .catch(e => { res.status(500).json({ status: e.message }) });
});

router.delete('/drivers/:id', (req, res) => {
    Driver.findByIdAndDelete(req.params.id)
        .then(() => res.json({ status: 'ok' }))
        .catch(e => { res.status(500).json({ status: e.message }) })
});

router.put('/drivers/:id', (req, res) => {
    Driver.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
        .then(driver => res.json({ status: 'ok', driver }))
        .catch(e => { res.status(500).json({ status: e.message }) })
});



module.exports = router;