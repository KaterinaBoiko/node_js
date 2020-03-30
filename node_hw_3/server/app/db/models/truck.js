const mongoose = require('mongoose');

module.exports = mongoose.model('Truck',
    mongoose.Schema({
        type: {
            type: String,
            required: true
        },
        created_by: {
            type: mongoose.ObjectId,
            ref: 'Driver',
            required: true
        },
        assigned_by: {
            type: mongoose.ObjectId,
            ref: 'Driver'
        },
        status: String
    })
);