import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityComponent } from './activity/activity.component';
import { ActivityRoutingModule } from 'app/activity/activity-routing.module';
import { MdButtonModule, MdCardModule, MdProgressSpinnerModule, MdIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ActivityRoutingModule,
    MdButtonModule,
    MdCardModule,
    MdProgressSpinnerModule,
    MdIconModule,
  ],
  declarations: [
    ActivityComponent
  ]
})
export class ActivityModule { }
