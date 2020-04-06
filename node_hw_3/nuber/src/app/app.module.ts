import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DriverPageComponent } from './driver-page/driver-page.component';
import { ShipperPageComponent } from './shipper-page/shipper-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignInComponent } from './dialogs/sign-in/sign-in.component';
import { SignUpComponent } from './dialogs/sign-up/sign-up.component';
import { AddTruckComponent } from './dialogs/add-truck/add-truck.component';

@NgModule({
  declarations: [
    AppComponent,
    DriverPageComponent,
    ShipperPageComponent,
    ProfilePageComponent,
    LandingPageComponent,
    SignInComponent,
    SignUpComponent,
    AddTruckComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSnackBarModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [SignInComponent, SignUpComponent, AddTruckComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
