import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-load-history',
  templateUrl: './load-history.component.html',
  styleUrls: ['./load-history.component.scss'],
})
export class LoadHistoryComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<LoadHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public logs: any
  ) {}

  ngOnInit(): void {}

  capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
