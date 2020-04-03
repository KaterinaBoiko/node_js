const jwt = require('jsonwebtoken');
const express = require('express');
const config = require('config');
const bcrypt = require("bcrypt");
const secret = config.get('secret');

const userSchema = require('../../joiSchemas/userSchema');
const Driver = require('../../db/models/driver');
const Shipper = require('../../db/models/shipper');

const router = express.Router();

router.post('/login', (req, res) => {
    const { error, value } = userSchema.validate(req.body);
    console.log(value);
    if (error)
        return res.status(400).json({ error: error.details[0].message })

    Driver.findOne({ email: value.email }, (err, driver) => {
        console.log(driver);
        if (!driver) {
            Shipper.findOne({ email: value.email }, (err, shipper) => {
                console.log(shipper);
                if (!shipper)
                    return res.status(400).json({ error: 'Such email is not registered.' })

                sendToken(req, res, shipper, "shipper");
            })
        } else
            sendToken(req, res, driver, "driver");
    })

});

function checkPassword(req, user) {
    return bcrypt.compare(req.body.password, user.password);
}

async function sendToken(req, res, user, role) {
    const passCorrect = await checkPassword(req, user);
    if (!passCorrect)
        return res.status(400).json({ error: "Password is incorrect." });

    const jwtToken = jwt.sign(user.toJSON(), secret);
    res.json({ role: role, jwtToken: jwtToken });
}

module.exports = router;