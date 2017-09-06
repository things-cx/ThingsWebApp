import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestResetComponent } from './request-reset/request-reset.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MdProgressSpinnerModule, MdInputModule, MdButtonModule, MdCardModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewEmailComponent } from './view-email/view-email.component';
import { ForgotPasswordRoutingModule } from '../forgot-password/forgot-password-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    ReactiveFormsModule,
    MdButtonModule,
    MdInputModule,
    MdProgressSpinnerModule,
    MdCardModule
  ],
  declarations: [RequestResetComponent, ChangePasswordComponent, ViewEmailComponent]
})
export class ForgotPasswordModule { }
