import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseURL';
import { User } from '../shared/classes/user';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  login(user: User) {
    return this.http
      .post(baseURL + 'api/login', user, this.httpOptions)
      .toPromise();
  }

  register(user: User) {
    console.log(user);
    return this.http
      .post(baseURL + 'api/' + user.role + 's', user, this.httpOptions)
      .toPromise();
  }
}
