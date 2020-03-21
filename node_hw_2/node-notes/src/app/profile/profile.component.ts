import { Component, OnInit } from '@angular/core';
import { baseURL } from '../shared/baseURL';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username: string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getProfile().subscribe(data => this.username = data.username,
      error => console.log(error))
  }

  getProfile(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token')
      })
    };
    return this.http.get<any>(baseURL + 'api/me', httpOptions);
  }

}
