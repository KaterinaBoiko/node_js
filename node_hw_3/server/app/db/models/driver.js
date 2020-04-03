const mongoose = require('mongoose');

module.exports = mongoose.model('Driver',
    mongoose.Schema({
        name: String,
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    })
);