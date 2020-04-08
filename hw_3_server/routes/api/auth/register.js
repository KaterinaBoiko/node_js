const express = require('express');
const bcrypt = require("bcrypt");

const registerSchema = require('../../../joiSchemas/registerSchema');
const Driver = require('../../../db/models/driver');
const Shipper = require('../../../db/models/shipper');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { error, value } = registerSchema.validate(req.body);
    if (error)
        return res.status(400).json(error.details[0].message)

    if (value.role == 'driver')
        user = new Driver(value);
    if (value.role == 'shipper')
        user = new Shipper(value);

    await bcrypt
        .hash(user.password, 10)
        .then(hash => user.password = hash)
        .catch(err => res.status(500).json(err.message))

    user.save()
        .then(() => {
            res.json({ status: 'User registered successfully' });
        })
        .catch(e => { res.status(500).json(e.message) });
})


module.exports = router;