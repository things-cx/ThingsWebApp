import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsActivityComponent } from './posts-activity/posts-activity.component';
import { ActivityRoutingModule } from '../activity/activity-routing.module';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { PostModule } from '../post/post.module';
import { ActivityListPostsComponent } from './activity-list-posts/activity-list-posts.component';
import { ActivityListThingsComponent } from './activity-list-things/activity-list-things.component';
import { ThingsActivityComponent } from './things-activity/things-activity.component';
import { MediaTypeModule } from '../shared/media-type/media-type.module';
import {
  MdButtonModule,
  MdCardModule,
  MdProgressSpinnerModule,
  MdIconModule,
  MdTabsModule,
  MdTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ActivityRoutingModule,
    MdButtonModule,
    MdCardModule,
    MdProgressSpinnerModule,
    MdIconModule,
    PostModule,
    MdTabsModule,
    MediaTypeModule,
    MdTooltipModule
  ],
  declarations: [
    ActivityListComponent,

    ActivityListPostsComponent,
    ActivityListThingsComponent,

    PostsActivityComponent,
    ThingsActivityComponent
  ]
})
export class ActivityModule { }
