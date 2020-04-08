import { Injectable } from '@angular/core';
import { baseURL } from '../shared/baseURL';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Load } from '../shared/classes/load';
import { Truck } from '../shared/classes/truck';

@Injectable({
  providedIn: 'root',
})
export class LoadPostingService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'JWT ' + localStorage.getItem('token'),
    }),
  };

  constructor(private http: HttpClient) {}

  getReadyTrucks() {
    return this.http
      .get(baseURL + 'api/readytrucks', this.httpOptions)
      .toPromise();
  }

  async tryPostLoad(load: Load) {
    let readyTrucks: Truck[];
    await this.getReadyTrucks()
      .then((data: any) => {
        readyTrucks = data.trucks;
      })
      .catch((error) => console.log(error));
    console.log(readyTrucks);
    readyTrucks.forEach((x) => console.log(this.compareLoadAndTruck(load, x)));
    let suitableTruck = readyTrucks.find((x) =>
      this.compareLoadAndTruck(load, x)
    );
    console.log(suitableTruck);
    if (suitableTruck) {
      this.postLoad(suitableTruck, load);
      //this.changeTruckStatus(suitableTruck, load);
    }
  }

  compareLoadAndTruck(load: Load, truck: Truck) {
    return (
      truck.type.dimensions.width >= load.dimensions.width &&
      truck.type.dimensions.length >= load.dimensions.length &&
      truck.type.dimensions.height >= load.dimensions.height &&
      truck.type.payload >= load.payload
    );
  }

  postLoad(truck: Truck, load: Load) {
    load.status = 'posted';
    load.assigned_by = truck.assigned_by;
    let newLogs;
    load.logs.push({ message: 'posted', time: new Date() });
    load.logs.forEach((x) =>
      newLogs.push({ message: x.message, time: x.time })
    );
    load.logs = newLogs;
    console.log(load);
    return this.http
      .patch(
        baseURL + 'api/loads/' + load._id + '/post',
        load,
        this.httpOptions
      )
      .toPromise()
      .then(() => (load.status = 'posted'));
  }

  changeTruckStatus(truck: Truck, load: Load) {
    return this.http
      .patch(
        baseURL + 'api/trucks/' + truck._id + '/status',
        { status: { abbr: 'ol', status: 'on load' } },
        this.httpOptions
      )
      .toPromise()
      .then((data: any) => (load.assigned_by = data.driverId));
  }
}
