import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignInComponent } from '../dialogs/sign-in/sign-in.component';
import { SignUpComponent } from '../dialogs/sign-up/sign-up.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialogSignIn(): void {
    this.dialog.open(SignInComponent, {
      width: '450px',
      data: {},
    });
  }

  openDialogSignUp(): void {
    this.dialog.open(SignUpComponent, {
      width: '450px',
      data: {},
    });
  }
}
