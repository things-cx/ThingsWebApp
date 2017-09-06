import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from '../login/login-routing.module';
import {
  MdButtonModule,
  MdCardModule,
  MdInputModule,
  MdProgressSpinnerModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdProgressSpinnerModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
