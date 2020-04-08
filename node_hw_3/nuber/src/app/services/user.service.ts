import { Injectable } from '@angular/core';
import { baseURL } from '../shared/baseURL';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../shared/classes/user';
import { Driver } from '../shared/classes/driver';
import { Shipper } from '../shared/classes/shipper';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currUser: User;

  constructor(private http: HttpClient) {}

  async getCurrUser() {
    await this.setUserData(
      localStorage.getItem('role'),
      localStorage.getItem('token')
    );
    return this.currUser;
  }

  getUserData<User>(jwtToken) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + jwtToken,
      }),
    };
    return this.http
      .get<User>(baseURL + 'api/profile', httpOptions)
      .toPromise()
      .then((data: User) => {
        this.currUser = Object.assign(this.currUser, data, {
          jwtToken: jwtToken,
        });
      })
      .catch((error) => console.log(error.error));
  }

  async setUserData(role, jwtToken) {
    if (role == 'driver') this.currUser = new Driver();
    else if (role == 'shipper') this.currUser = new Shipper();
    localStorage.setItem('role', role);
    localStorage.setItem('token', jwtToken);

    await this.getUserData(jwtToken);
  }
}
