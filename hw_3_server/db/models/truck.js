const mongoose = require('mongoose');

module.exports = mongoose.model('Truck',
    mongoose.Schema({
        type: {
            type: {
                name: String,
                dimensions: {
                    width: Number,
                    length: Number,
                    height: Number
                },
                payload: Number
            },
            required: true,
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
        status: {
            abbr: String,
            status: String,
        }
    })
);