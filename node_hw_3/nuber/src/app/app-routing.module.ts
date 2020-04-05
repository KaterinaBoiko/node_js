import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { DriverPageComponent } from './driver-page/driver-page.component';
import { ShipperPageComponent } from './shipper-page/shipper-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'driver', component: DriverPageComponent },
  { path: 'shipper', component: ShipperPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
