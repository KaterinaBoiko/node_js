import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../shared/classes/user';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ShipperService } from '../services/shipper.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  user: User;
  constructor(
    private userService: UserService,
    private shipperService: ShipperService,
    public location: Location,
    private router: Router
  ) {}

  async ngOnInit() {
    this.user = await this.userService.getCurrUser();
    console.log(this.user);
  }

  onSubmit(res: any) {
    const { username, name, email } = res;
    this.user.username = username;
    this.user.name = name;
    this.user.email = email;
    console.log(res);
    console.log(this.user);
  }

  deleteAccount() {
    if (localStorage.getItem('role') == 'shipper') {
      this.shipperService
        .deleteAccount(this.user._id)
        .then(() => {
          this.logOut();
          this.router.navigateByUrl('/');
        })
        .catch((error) => console.log(error));
    }
  }

  logOut() {
    localStorage.clear();
  }
}
