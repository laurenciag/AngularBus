import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ButtonComponent } from '../button/button.component';
import { LayoutComponent } from '../layout/layout.component';
import { HomeComponent } from './../../pages/home/home.component'
import { AgencyComponent } from 'src/app/pages/agency/agency.component';
import { BusesComponent } from 'src/app/pages/buses/buses.component';
import { TripsComponent } from 'src/app/pages/trips/trips.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'agency', component: AgencyComponent },
  { path: 'buses', component: BusesComponent },
  { path: 'trips', component: TripsComponent },
  { path: 'profile', component: ProfileComponent}
//   { path: 'button', component: ButtonComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}