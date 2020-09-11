import { Component, OnInit } from '@angular/core';
import { User } from '../../constant/user';
import { Agency } from 'src/app/constant/agency';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/utils/auth.service';
import { ApiService } from 'src/app/utils/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  agency: Agency;
  registerRequests={
    firstName: "",
      lastName:"",
      email:"",
      password:"",
      rePassword:"",
      agencyName:"",
      agencyDetails:"",
      mobileNumber:""
}

  constructor(
    private myRoute: Router,
    public auth: AuthService,
    private apiService: ApiService,
    ) { }

  ngOnInit(): void {
    // this.createAccount();
  }

  createAccount() {
    console.log(this.registerRequests);
    this.apiService.createAccount(this.registerRequests).subscribe((registerRequest)=>
    {    
  alert ("Register Done!");
    this.myRoute.navigate(["/login"])})
    
  }

}
