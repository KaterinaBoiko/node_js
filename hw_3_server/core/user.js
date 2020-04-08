module.exports = class User {
    constructor(id, name, username, email, password) {
        if (new.target === User)
            throw new TypeError("Cannot construct User instances directly");

        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
