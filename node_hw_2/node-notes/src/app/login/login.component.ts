import { Component, OnInit, ViewChild } from '@angular/core';
import { baseURL } from '../shared/baseURL';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../shared/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('login') loginFormDirective;
  loginForm: FormGroup;
  user: User;


  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.user = this.loginForm.value;
    this.loginForm.reset({
      username: '',
      password: ''
    });
    this.loginFormDirective.resetForm();
    this.login(this.user).subscribe((data: any) => {
      localStorage.setItem('token', data.jwt_token);
      this.router.navigateByUrl('/notes');
    },
      error => console.log(error.error.status));
  }

  login(user: User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(baseURL + 'api/login', this.user, httpOptions);
  }

}
