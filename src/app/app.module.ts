import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/LoginAuth/login/login.component';
import { PageNotFoundComponent } from './../app/pages/page-not-found/page-not-found.component';

import { LoginModule } from '../app/pages/LoginAuth/login.module';
import { LayoutModule } from '../app/layouts/layout/layout.module'
import { AuthService } from './utils/auth.service';
import { AuthGuard } from './auth.guard';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    LoginModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
    RouterModule
  ],
  providers: [ AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
