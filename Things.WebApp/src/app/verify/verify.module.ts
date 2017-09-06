import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyComponent } from './verify/verify.component';
import { VerifyRoutingModule } from '../verify/verify-routing.module';
import { MdButtonModule, MdCardModule, MdProgressSpinnerModule, MdIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    VerifyRoutingModule,
    MdButtonModule,
    MdCardModule,
    MdProgressSpinnerModule,
    MdIconModule
  ],
  declarations: [VerifyComponent]
})
export class VerifyModule { }
