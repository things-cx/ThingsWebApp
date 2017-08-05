import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityComponent } from './activity/activity.component';
import { ActivityRoutingModule } from 'app/activity/activity-routing.module';
import { MdButtonModule, MdCardModule, MdProgressSpinnerModule, MdIconModule } from '@angular/material';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { PostModule } from 'app/post/post.module';

@NgModule({
  imports: [
    CommonModule,
    ActivityRoutingModule,
    MdButtonModule,
    MdCardModule,
    MdProgressSpinnerModule,
    MdIconModule,
    PostModule
  ],
  declarations: [
    ActivityComponent,
    ActivityListComponent
  ]
})
export class ActivityModule { }
