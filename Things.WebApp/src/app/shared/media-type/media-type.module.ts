import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaTypeComponent } from 'app/shared/media-type/media-type/media-type.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MediaTypeComponent
  ],
  exports: [
    MediaTypeComponent
  ]
})
export class MediaTypeModule { }
