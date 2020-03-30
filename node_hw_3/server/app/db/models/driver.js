const mongoose = require('mongoose');

module.exports = mongoose.model('Driver',
    mongoose.Schema({
        name: String,
        username: {
            type: String,
            required: true
        },
        email: String,
        password: {
            type: String,
            required: true
        }
    })
);