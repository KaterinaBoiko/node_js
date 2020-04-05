export class User {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;

  constructor(email, password) {
    if (new.target === User)
      throw new TypeError('Cannot construct User instances directly');

    this.email = email;
    this.password = password;
  }
}
