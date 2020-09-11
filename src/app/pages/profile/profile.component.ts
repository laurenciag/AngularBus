import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/constant/user';
import { ApiService } from 'src/app/utils/api.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/utils/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  password: string;
  users: User;
  constructor(
    private myRoute: Router,
    public auth: AuthService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    let jwt = this.auth.decodeJWT();
    console.log('user',jwt)
    this.apiService
    .getUser(jwt.userId)
    .subscribe((user) => {
      console.log('user', user);
      this.users = user;
    })
  }

  editUser() {
    let jwt = this.auth.decodeJWT();
    console.log("editUser", this.users);
    this.apiService.updateUser(jwt.userId, this.users)
    .subscribe((dataUser)=>
    {
      this.apiService.getUser(jwt.userId).subscribe((user)=>
      {
        alert("Data berhasil di update!")
        this.users = user})
    })
  }

  updatePassword(){
    this.users.password=this.password;
    this.apiService.updatePassword(this.users)
    .subscribe((user) =>
    {
      this.users = user;
      alert("Password berhasil diubah!")
    });
  }
}
