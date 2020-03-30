module.exports = mongoose.model('Shipper',
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