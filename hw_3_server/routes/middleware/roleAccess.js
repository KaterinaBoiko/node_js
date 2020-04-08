const Shipper = require('../../db/models/shipper');
const Driver = require('../../db/models/driver');


module.exports = (req, res, next) => {
    Shipper.findById(req.user._id)
        .then(shipper => {
            if (shipper) {
                req.user.role = 'shipper'
                return next();
            }
        }).catch(e => { res.status(500).json(e.message) })

    Driver.findById(req.user._id)
        .then(driver => {
            if (driver) {
                req.user.role = 'driver'
                return next();
            }
        })
        .catch(e => { res.status(500).json(e.message) })
};
