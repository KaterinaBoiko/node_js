const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) => {
    res.json({
        _id: req.user._id,
        name: req.user.name,
        username: req.user.username,
        email: req.user.email
    });
});

module.exports = router;