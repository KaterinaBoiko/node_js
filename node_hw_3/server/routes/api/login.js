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
    if (error)
        return res.status(400).json(error.details[0].message)

    if (!value.role)
        return res.status(400).json('Role wasn`t specified.')

    if (value.role == 'driver') {
        Driver.findOne({ email: value.email }, (err, driver) => {
            if (!driver)
                return res.status(400).json('Such email is not registered as a driver.')

            sendToken(req, res, driver);
        })
        return;
    }

    if (value.role == 'shipper') {
        Shipper.findOne({ email: value.email }, (err, shipper) => {
            if (!shipper)
                return res.status(400).json('Such email is not registered as a shipper.')

            sendToken(req, res, shipper);
        })
        return;
    }
});

function checkPassword(req, user) {
    return bcrypt.compare(req.body.password, user.password);
}

async function sendToken(req, res, user) {
    const passCorrect = await checkPassword(req, user);
    if (!passCorrect)
        return res.status(400).json("Password is incorrect.");

    const jwtToken = jwt.sign(user.toJSON(), secret);
    res.json({ role: req.body.role, jwtToken: jwtToken });
}

module.exports = router;