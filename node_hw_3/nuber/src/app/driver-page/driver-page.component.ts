import { Component, OnInit } from '@angular/core';
import { DriverService } from '../services/driver.service';
import { Truck, TruckType } from '../shared/classes/truck';
import { Driver } from '../shared/classes/driver';
import { AddTruckComponent } from '../dialogs/add-truck/add-truck.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-driver-page',
  templateUrl: './driver-page.component.html',
  styleUrls: ['./driver-page.component.scss'],
})
export class DriverPageComponent implements OnInit {
  createdTrucks: Truck[];
  currDriver: Driver;

  constructor(
    private driverService: DriverService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    this.currDriver = await this.driverService.getCurrentDriver();
    console.log(this.currDriver);
    await this.driverService.getTrucks();
    this.createdTrucks = this.driverService.createdTrucks;
    console.log(this.createdTrucks);
  }

  openDialogAddTruck(): void {
    const dialogRef = this.dialog.open(AddTruckComponent, {
      width: '600px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((truckType: TruckType) => {
      if (!truckType) return;
      const truck = new Truck(truckType, this.currDriver._id);
      console.log(JSON.stringify(truck));
      this.driverService
        .addTruck(truck)
        .then(() => this.createdTrucks.push(truck))
        .catch((error) => this.openSnackBar(error.error));
    });
  }

  assignTruck(truck: Truck) {
    this.driverService
      .assignTruck(truck._id, this.currDriver._id)
      .then(() => {
        let truckToUnassign = this.createdTrucks.find(
          (x) => x.assigned_by == this.currDriver._id
        );
        if (truckToUnassign) truckToUnassign.assigned_by = undefined;
        truck.assigned_by = this.currDriver._id;
      })
      .catch((error) => this.openSnackBar(error.error));
  }

  deleteTruck(truck: Truck) {
    this.driverService
      .deleteTruck(truck._id)
      .then(() => {
        let index = this.createdTrucks.findIndex((x) => x._id == truck._id);
        this.createdTrucks.splice(index, 1);
      })
      .catch((error) => this.openSnackBar(error.error));
  }

  onStatusChange(truck: Truck) {
    if (truck.status.abbr == 'is')
      this.driverService.changeTruckStatus(
        { abbr: 'is', status: 'in service' },
        truck._id
      );
    if (truck.status.abbr == 'ol')
      this.driverService.changeTruckStatus(
        { abbr: 'ol', status: 'on load' },
        truck._id
      );
  }

  logOut() {
    localStorage.clear();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', { duration: 3000 });
  }

  capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
