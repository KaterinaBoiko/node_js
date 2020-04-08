const jwt = require('jsonwebtoken');
const express = require('express');
const config = require('config');
const bcrypt = require("bcrypt");
const secret = config.get('secret');

const loginSchema = require('../../../joiSchemas/loginSchema');
const Driver = require('../../../db/models/driver');
const Shipper = require('../../../db/models/shipper');

const router = express.Router();

router.post('/login', (req, res) => {
    const { error, value } = loginSchema.validate(req.body);
    if (error)
        return res.status(400).json(error.details[0].message)

    Driver.findOne({ username: value.username }, (err, driver) => {
        if (!driver) {
            Shipper.findOne({ username: value.username }, (err, shipper) => {
                if (!shipper)
                    return res.status(400).json('Such username is not registered.')

                sendToken(req, res, shipper);
            })
        }
        sendToken(req, res, driver);
    })
})

function checkPassword(req, user) {
    return bcrypt.compare(req.body.password, user.password);
}

async function sendToken(req, res, user) {
    const passCorrect = await checkPassword(req, user);
    if (!passCorrect)
        return res.status(400).json("Password is incorrect.");

    const jwtToken = jwt.sign(user.toJSON(), secret);
    res.json({ status: 'User authenticated successfully', token: jwtToken });
}

module.exports = router;