import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from './tag/tag.component';
import { TagRoutingModule } from '../tag/tag-routing.module';
import { MdCardModule, MdButtonModule, MdIconModule } from '@angular/material';
import { MediaTypeModule } from '../shared/media-type/media-type.module';

@NgModule({
  imports: [
    CommonModule,
    TagRoutingModule,
    MdCardModule,
    MediaTypeModule,
    MdButtonModule,
    MdIconModule
  ],
  declarations: [TagComponent]
})
export class TagModule { }
