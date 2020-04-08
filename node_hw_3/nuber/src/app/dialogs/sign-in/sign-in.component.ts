import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { User } from 'src/app/shared/classes/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

export interface SignInData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  user: User;
  hidePass = true;

  constructor(
    public dialogRef: MatDialogRef<SignInComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: SignInData,
    private fb: FormBuilder,
    private authService: AuthorizationService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.signInForm = this.fb.group({
      email: ['a@g.com', [Validators.required, Validators.email]],
      password: [
        '12345',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
      role: ['', Validators.required],
    });
  }

  onSubmit() {
    this.user = this.signInForm.value;
    this.authService
      .login(this.user)
      .then((result: any) => {
        this.userService.setUserData(this.user.role, result.jwtToken);
        this.router.navigateByUrl('/' + this.user.role);
        this.dialogRef.close();
      })
      .catch((error) => {
        this.openSnackBar(error.error);
      });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', { duration: 3000 });
  }
}
