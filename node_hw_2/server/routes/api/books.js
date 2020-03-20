const express = require('express');
const router = express.Router();

router.get('/books', (req, res) => {
    res.json({books: []});
});

module.exports = router;