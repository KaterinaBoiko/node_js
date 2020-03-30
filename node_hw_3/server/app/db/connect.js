const mongoose = require('mongoose');
const config = require('config');

mongoose.connect(config.get('dbUrl'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

module.exports = mongoose;

