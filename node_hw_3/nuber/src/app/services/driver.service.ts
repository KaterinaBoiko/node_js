import { Injectable } from '@angular/core';
import { baseURL } from '../shared/baseURL';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Driver } from '../shared/classes/driver';
import { UserService } from './user.service';
import { Truck, TruckType } from '../shared/classes/truck';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  private currDriver: Driver = null;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'JWT ' + localStorage.getItem('token'),
    }),
  };

  constructor(private http: HttpClient, private userService: UserService) {
    if (this.userService.getCurrUser() instanceof Driver)
      this.currDriver = this.userService.getCurrUser();
    console.log(this.currDriver);
  }

  getCurrentDriver() {
    return this.currDriver;
  }

  getTrucks() {
    return this.http.get(baseURL + 'api/trucks', this.httpOptions).toPromise();
  }

  addTruck(truck: Truck) {
    return this.http
      .post<Truck>(baseURL + 'api/trucks', truck, this.httpOptions)
      .toPromise();
  }
}
