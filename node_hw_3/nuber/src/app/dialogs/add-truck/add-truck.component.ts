import { Component, OnInit } from '@angular/core';
import { TruckTypes, TruckType } from '../../shared/classes/truck';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-truck',
  templateUrl: './add-truck.component.html',
  styleUrls: ['./add-truck.component.scss'],
})
export class AddTruckComponent implements OnInit {
  truckTypeName: string;
  truckTypes: TruckType[] = TruckTypes;
  constructor(public dialogRef: MatDialogRef<AddTruckComponent>) {}

  ngOnInit(): void {}

  chooseType() {
    console.log(this.truckTypeName);
    this.dialogRef.close(
      this.truckTypes.find((x) => x.name == this.truckTypeName)
    );
  }
}
