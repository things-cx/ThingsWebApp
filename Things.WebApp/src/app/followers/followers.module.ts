import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowersComponent } from './followers/followers.component';
import { FollowersRoutingModule } from 'app/followers/followers-routing.module';
import { MdButtonModule, MdCardModule, MdProgressSpinnerModule, MdIconModule } from '@angular/material';
import { MediaTypeModule } from 'app/shared/media-type/media-type.module';

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
