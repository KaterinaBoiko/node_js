const User = require('./user');

module.exports = class Shipper extends User {
    constructor(id, name, username, email, password) {
        super(id, name, username, email, password);
    }
}