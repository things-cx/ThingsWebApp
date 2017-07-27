import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule, MdCardModule, MdInputModule } from '@angular/material';
import { LoginRoutingModule } from 'app/login/login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
