import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikesComponent } from './likes/likes.component';
import { LikesRoutingModule } from '../likes/likes-routing.module';
import { MdButtonModule, MdCardModule, MdProgressSpinnerModule, MdIconModule } from '@angular/material';
import { MediaTypeModule } from '../shared/media-type/media-type.module';

@NgModule({
  imports: [
    CommonModule,
    LikesRoutingModule,
    MdButtonModule,
    MdCardModule,
    MdProgressSpinnerModule,
    MdIconModule,
    MediaTypeModule
  ],
  declarations: [LikesComponent]
})
export class LikesModule { }
