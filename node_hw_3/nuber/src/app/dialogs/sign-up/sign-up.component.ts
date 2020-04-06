import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { User } from 'src/app/shared/classes/user';
import { UserService } from 'src/app/services/user.service';

export interface SignUpData {
  name: string;
  username: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  user: User;
  hidePass = true;

  constructor(
    public dialogRef: MatDialogRef<SignUpComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: SignUpData,
    private fb: FormBuilder,
    private authService: AuthorizationService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.signUpForm = this.fb.group(
      {
        name: [null, [Validators.minLength(2), Validators.maxLength(30)]],
        username: [
          'Anna',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
          ],
        ],
        role: [null, Validators.required],
        email: ['ss@ss.com', [Validators.required, Validators.email]],
        password: [
          '12345',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(30),
          ],
        ],
        confirmPass: ['12345', [Validators.required]],
      },
      { validator: this.mustMatch('password', 'confirmPass') }
    );
  }

  onSubmit() {
    delete this.signUpForm.value.confirmPass;
    this.user = this.signUpForm.value;
    console.log(this.user);
    this.authService
      .register(this.user)
      .then((result: any) => {
        console.log(result);
        this.userService.setUserData(this.user.role, result.jwtToken);
        this.router.navigateByUrl('/' + this.user.role);
        this.dialogRef.close();
      })
      .catch((error) => {
        console.log(error.error);
        this.openSnackBar(error.error);
      });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', { duration: 3000 });
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) return;

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
