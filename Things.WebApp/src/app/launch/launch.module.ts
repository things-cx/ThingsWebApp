import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaunchComponent } from './launch/launch.component';
import { LaunchRoutingModule } from '../launch/launch-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LaunchRoutingModule
  ],
  declarations: [LaunchComponent]
})
export class LaunchModule { }
