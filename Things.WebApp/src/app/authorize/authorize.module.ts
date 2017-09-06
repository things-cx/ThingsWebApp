import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizeComponent } from './authorize/authorize.component';
import { AuthorizeRoutingModule } from '../authorize/authorize-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule, MdInputModule, MdProgressSpinnerModule, MdCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    AuthorizeRoutingModule,
    ReactiveFormsModule,
    MdButtonModule,
    MdInputModule,
    MdProgressSpinnerModule,
    MdCardModule
  ],
  declarations: [AuthorizeComponent]
})
export class AuthorizeModule { }
