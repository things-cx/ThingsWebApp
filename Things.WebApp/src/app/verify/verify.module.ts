import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyComponent } from './verify/verify.component';
import { VerifyRoutingModule } from 'app/verify/verify-routing.module';

@NgModule({
  imports: [
    CommonModule,
    VerifyRoutingModule
  ],
  declarations: [VerifyComponent]
})
export class VerifyModule { }
