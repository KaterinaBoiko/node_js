const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const secret = require('../../config/auth').secret;

let users = [
    {id: 1, username: 'Kateryna', password: '123abc', jwt_token: null},
    {id: 2, username: 'Vova', password: '123456', jwt_token: null}
]
router.post('/login', (req, res) => {
    let {username, password} = req.body;
    console.log(req.body);

    let [user] = users.filter(user => (user.username == username && user.password == password));
  
    if(!user) {
        res.status(401).json({status: 'User not found'});
    }

    let jwt_token = jwt.sign(user, secret);
    user.jwt_token = jwt_token;
    res.json({jwt_token: jwt_token});
});

module.exports = router;