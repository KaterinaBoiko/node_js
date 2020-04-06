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

  ngOnInit(): void {
    this.currDriver = this.driverService.getCurrentDriver();
    this.driverService.getTrucks().then((result: any) => {
      this.createdTrucks = result.trucks;
      console.log(this.createdTrucks);
    });
  }

  openDialogAddTruck(): void {
    const dialogRef = this.dialog.open(AddTruckComponent, {
      width: '600px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((truckType: TruckType) => {
      if (!truckType) return;
      const truck = new Truck(truckType, this.currDriver.id);
      console.log(JSON.stringify(truck));
      this.driverService
        .addTruck(truck)
        .then(() => this.createdTrucks.push(truck))
        .catch((error) => this.openSnackBar(error.error));
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', { duration: 3000 });
  }

  capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
