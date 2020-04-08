import { Injectable } from '@angular/core';
import { baseURL } from '../shared/baseURL';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Driver } from '../shared/classes/driver';
import { UserService } from './user.service';
import { Truck } from '../shared/classes/truck';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  private currDriver: Driver = null;
  public createdTrucks: Truck[] = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'JWT ' + localStorage.getItem('token'),
    }),
  };

  constructor(private http: HttpClient, private userService: UserService) {}

  async getCurrentDriver() {
    if ((await this.userService.getCurrUser()) instanceof Driver)
      return await this.userService.getCurrUser();
    return null;
  }

  getTrucks() {
    console.log(localStorage.getItem('token'));
    return this.http
      .get(baseURL + 'api/trucks', this.httpOptions)
      .toPromise()
      .then((result: any) => {
        console.log(result.trucks);
        this.createdTrucks = result.trucks;
      })
      .catch((error) => console.log(error.error));
  }

  addTruck(truck: Truck) {
    return this.http
      .post<Truck>(baseURL + 'api/trucks', truck, this.httpOptions)
      .toPromise();
  }

  assignTruck(truckId: string, assignedBy: string) {
    return this.http
      .put<Truck>(
        baseURL + 'api/trucks/' + truckId,
        { assigned_by: assignedBy },
        this.httpOptions
      )
      .toPromise();
  }

  deleteTruck(truckId: string) {
    return this.http
      .delete<Truck>(baseURL + 'api/trucks/' + truckId, this.httpOptions)
      .toPromise();
  }

  changeTruckStatus(status, truckId: string) {
    return this.http
      .put<Truck>(
        baseURL + 'api/trucks/' + truckId,
        { status: status },
        this.httpOptions
      )
      .toPromise()
      .then();
  }
}
