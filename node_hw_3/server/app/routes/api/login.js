const jwt = require('jsonwebtoken');
const express = require('express');
const config = require('config');

console.log(config);
const router = express.Router();

const secret = config.get('secret');

const users = [
    { id: 1, username: 'Kateryna', password: '123abc' },
    { id: 2, username: 'Vova', password: '123456' }
]
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const [user] = users.filter(user => (user.username == username && user.password == password));

    if (!user) {
        res.status(401).json({ status: 'User not found' });
    }

    const jwtToken = jwt.sign(user, secret);
    res.json({ jwtToken: jwtToken });
});

module.exports = router;