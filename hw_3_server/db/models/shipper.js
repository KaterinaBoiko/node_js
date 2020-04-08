const mongoose = require('mongoose');

module.exports = mongoose.model('Shipper',
    mongoose.Schema({
        name: String,
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String
        },
        password: {
            type: String,
            required: true
        }
    })
);