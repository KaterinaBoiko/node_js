import { Injectable } from '@angular/core';
import { baseURL } from '../shared/baseURL';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Shipper } from '../shared/classes/shipper';
import { UserService } from './user.service';
import { Load } from '../shared/classes/load';

@Injectable({
  providedIn: 'root',
})
export class ShipperService {
  private currShipper: Shipper = null;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'JWT ' + localStorage.getItem('token'),
    }),
  };

  constructor(private http: HttpClient, private userService: UserService) {}

  async getCurrentShipper() {
    if ((await this.userService.getCurrUser()) instanceof Shipper)
      return await this.userService.getCurrUser();
    return null;
  }

  getLoads() {
    return this.http.get(baseURL + 'api/loads', this.httpOptions).toPromise();
  }

  addLoad(load: Load) {
    return this.http
      .post<Load>(baseURL + 'api/loads', load, this.httpOptions)
      .toPromise();
  }

  changeLoad(changes: any) {
    return this.http
      .put<Load>(
        baseURL + 'api/loads/' + changes._id,
        changes,
        this.httpOptions
      )
      .toPromise();
  }

  deleteLoad(loadId: string) {
    return this.http
      .delete<Load>(baseURL + 'api/loads/' + loadId, this.httpOptions)
      .toPromise();
  }

  getDriver(loadAssignedBy: string) {
    return this.http
      .get(baseURL + 'api/drivers/' + loadAssignedBy, this.httpOptions)
      .toPromise();
  }

  deleteAccount(shipperId: string) {
    return this.http
      .delete(baseURL + 'api/shippers/' + shipperId, this.httpOptions)
      .toPromise();
  }
}
