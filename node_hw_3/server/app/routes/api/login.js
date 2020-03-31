const jwt = require('jsonwebtoken');
const express = require('express');
const config = require('config');
const secret = config.get('secret');

const userSchema = require('../../joiSchemas/userSchema');
const Driver = require('../../db/models/driver');
const Shipper = require('../../db/models/shipper');

const router = express.Router();

router.post('/login', (req, res) => {
    const { error, value } = userSchema.validate(req.body);

    if (error)
        res.status(400).json({ error: error.details[0].message })
    else {
        Driver.findOne(value, (err, driver) => {
            if (!driver) {
                Shipper.findOne(value, (err, shipper) => {
                    if (!shipper) res.status(400).json({ error: err })
                    else {
                        const jwtToken = jwt.sign(shipper.toJSON(), secret);
                        res.json({ role: "shipper", jwtToken: jwtToken });
                    }
                })
            } else {
                const jwtToken = jwt.sign(driver.toJSON(), secret);
                res.json({ role: "driver", jwtToken: jwtToken });
            }
        })
    }
});

module.exports = router;