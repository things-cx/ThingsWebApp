import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityComponent } from './activity/activity.component';
import { ActivityRoutingModule } from 'app/activity/activity-routing.module';
import { MdButtonModule, MdCardModule, MdProgressSpinnerModule, MdIconModule, MdTabsModule } from '@angular/material';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { PostModule } from 'app/post/post.module';
import { ActivityListPostsComponent } from './activity-list-posts/activity-list-posts.component';
import { ActivityListThingsComponent } from './activity-list-things/activity-list-things.component';

@NgModule({
  imports: [
    CommonModule,
    ActivityRoutingModule,
    MdButtonModule,
    MdCardModule,
    MdProgressSpinnerModule,
    MdIconModule,
    PostModule,
    MdTabsModule
  ],
  declarations: [
    ActivityComponent,
    ActivityListComponent,
    ActivityListPostsComponent,
    ActivityListThingsComponent
  ]
})
export class ActivityModule { }
