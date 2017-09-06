import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdCardModule, MdProgressSpinnerModule, MdIconModule } from '@angular/material';
import { FollowersComponent } from './followers/followers.component';
import { FollowersRoutingModule } from '../followers/followers-routing.module';
import { MediaTypeModule } from '../shared/media-type/media-type.module';

@NgModule({
  imports: [
    CommonModule,
    FollowersRoutingModule,
    MdButtonModule,
    MdCardModule,
    MdProgressSpinnerModule,
    MdIconModule,
    MediaTypeModule
  ],
  declarations: [FollowersComponent]
})
export class FollowersModule { }
