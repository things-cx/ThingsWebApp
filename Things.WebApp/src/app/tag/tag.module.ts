import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from './tag/tag.component';
import { TagRoutingModule } from 'app/tag/tag-routing.module';
import { MdCardModule } from '@angular/material';
import { MediaTypeModule } from 'app/shared/media-type/media-type.module';

@NgModule({
  imports: [
    CommonModule,
    TagRoutingModule,
    MdCardModule,
    MediaTypeModule
  ],
  declarations: [TagComponent]
})
export class TagModule { }
