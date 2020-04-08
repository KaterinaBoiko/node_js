const mongoose = require('mongoose');

module.exports = mongoose.model('Load',
    mongoose.Schema({
        title: String,
        logs: [{
            message: String,
            time: {
                type: Date,
                default: Date.now
            },
        }],
        created_by: {
            type: mongoose.ObjectId,
            ref: 'Shipper',
            required: true
        },
        assigned_to: {
            type: mongoose.ObjectId,
            ref: 'Driver'
        },
        status: String,
        state: String,
        dimensions: {
            width: Number,
            length: Number,
            height: Number
        },
        payload: Number
    })
);