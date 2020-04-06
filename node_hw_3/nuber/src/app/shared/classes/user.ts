export class User {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
  jwtToken: string;

  constructor() {
    if (new.target === User)
      throw new TypeError('Cannot construct User instances directly');
  }
}
