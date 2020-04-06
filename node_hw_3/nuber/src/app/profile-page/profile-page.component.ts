import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../shared/classes/user';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  user: User;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrUser();
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
}
