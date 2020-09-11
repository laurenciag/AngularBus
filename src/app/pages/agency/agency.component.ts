import { Component, OnInit } from '@angular/core';
import { Agency } from 'src/app/constant/agency';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/utils/auth.service';
import { ApiService } from 'src/app/utils/api.service';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {


  agency: Agency;
  constructor(
    private myRoute: Router,
    public auth: AuthService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getAgency();
  }

  getAgency() {
    let jwt = this.auth.decodeJWT();
    console.log('agency',jwt)
    this.apiService
    .getAgency(jwt.agencyId)
    .subscribe((agency) => {
      console.log('agency', agency);
      this.agency = agency;
    })
  }

  editAgency() {
    let jwt = this.auth.decodeJWT();
    console.log("editAgency", this.agency);
    this.apiService.updateAgency(jwt.agencyId, this.agency)
    .subscribe((dataAgency)=>
    {
      this.apiService.getAgency(jwt.agencyId).subscribe((agency)=>
      {
        alert("Data berhasil di update!")
        this.agency = agency})
    })
  }

}
