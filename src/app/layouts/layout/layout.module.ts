import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutRoutingModule } from '../layout/layout-routing.module';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { LayoutComponent } from './layout.component';
import { AgencyComponent } from './../../pages/agency/agency.component';
import { BusesComponent } from './../../pages/buses/buses.component';
import { TripsComponent } from './../../pages/trips/trips.component';
import { ProfileComponent } from './../../pages/profile/profile.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    AgencyComponent,
    BusesComponent,
    TripsComponent,
    ProfileComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    LayoutRoutingModule
  ],
})
export class LayoutModule { }
