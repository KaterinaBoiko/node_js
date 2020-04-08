import { Component, OnInit } from '@angular/core';
import { Load } from '../shared/classes/load';
import { Shipper } from '../shared/classes/shipper';
import { ShipperService } from '../services/shipper.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddLoadComponent } from '../dialogs/add-load/add-load.component';
import { LoadHistoryComponent } from '../dialogs/load-history/load-history.component';
import { DriverInfoComponent } from '../dialogs/driver-info/driver-info.component';
import { LoadPostingService } from '../services/load-posting.service';

@Component({
  selector: 'app-shipper-page',
  templateUrl: './shipper-page.component.html',
  styleUrls: ['./shipper-page.component.scss'],
})
export class ShipperPageComponent implements OnInit {
  createdLoads: Load[];
  currShipper: Shipper;

  constructor(
    private shipperService: ShipperService,
    private loadPostingService: LoadPostingService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    this.currShipper = await this.shipperService.getCurrentShipper();
    console.log(this.currShipper);
    this.shipperService.getLoads().then((result: any) => {
      this.createdLoads = result.loads;
      console.log(this.createdLoads);
    });
  }

  openDialogAddload(): void {
    const dialogRef = this.dialog.open(AddLoadComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.beforeClosed().subscribe((data) => {
      if (!data) return;
      const { title, width, length, height, payload } = data;
      const load = new Load(
        title,
        this.currShipper._id,
        { width: width, length: length, height: height },
        payload
      );
      this.shipperService
        .addLoad(load)
        .then(() => this.createdLoads.push(load))
        .catch((error) => this.openSnackBar(error.error));
    });
  }

  openDialogHistory(loadLogs): void {
    this.dialog.open(LoadHistoryComponent, {
      width: '400px',
      data: loadLogs,
    });
  }

  openDialogDriverInfo(driverId): void {
    this.shipperService
      .getDriver(driverId)
      .then((data: any) => {
        this.dialog.open(DriverInfoComponent, {
          width: '400px',
          data: data,
        });
      })
      .catch((error) => this.openSnackBar(error.error));
  }

  async postLoad(load: Load) {
    let trucks = await this.loadPostingService.tryPostLoad(load);
  }

  deleteLoad(load: Load) {
    this.shipperService
      .deleteLoad(load._id)
      .then(() => {
        let index = this.createdLoads.findIndex((x) => x._id == load._id);
        this.createdLoads.splice(index, 1);
      })
      .catch((error) => this.openSnackBar(error.error));
  }

  logOut() {
    localStorage.clear();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', { duration: 3000 });
  }
}
