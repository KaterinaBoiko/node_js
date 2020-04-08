import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Load } from '../../shared/classes/load';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-load',
  templateUrl: './add-load.component.html',
  styleUrls: ['./add-load.component.scss'],
})
export class AddLoadComponent implements OnInit {
  load: Load;
  addLoadForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddLoadComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.addLoadForm = this.fb.group({
      title: ['Food', Validators.required],
      width: [
        130,
        [
          Validators.required,
          Validators.pattern(/^[0-9]+$/),
          Validators.max(700),
        ],
      ],
      length: [
        130,
        [
          Validators.required,
          Validators.pattern(/^[0-9]+$/),
          Validators.max(350),
        ],
      ],
      height: [
        130,
        [
          Validators.required,
          Validators.pattern(/^[0-9]+$/),
          Validators.max(200),
        ],
      ],
      payload: [
        130,
        [
          Validators.required,
          Validators.pattern(/^[0-9]+$/),
          Validators.max(4000),
        ],
      ],
    });
  }
  onSubmit() {
    //this.load = new Load(title, )
    //console.log(this.load);
    this.dialogRef.close(this.addLoadForm.value);
  }
}
