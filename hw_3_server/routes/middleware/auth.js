const jwt = require('jsonwebtoken');
const config = require('config');

const secret = config.get('secret');

module.exports = (req, res, next) => {
    // JWT ajsrdfdlojio
    const [, jwtToken] = req.headers['authorization'].split(' ');

    jwt.verify(jwtToken, secret, (err, result) => {
        if (err)
            return res.status(401).json({ error: err });
        req.user = result;
        return next();
    });
};
