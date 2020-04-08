import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Driver } from 'src/app/shared/classes/driver';

@Component({
  selector: 'app-driver-info',
  templateUrl: './driver-info.component.html',
  styleUrls: ['./driver-info.component.scss'],
})
export class DriverInfoComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DriverInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public driver: Driver
  ) {}

  ngOnInit(): void {
    console.log(this.driver);
  }
}
