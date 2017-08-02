import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaTypeComponent } from 'app/shared/media-type/media-type/media-type.component';
import { ViewMediaDialogComponent } from './view-media-dialog/view-media-dialog.component';
import { MdDialogModule, MdButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdDialogModule,
    MdButtonModule
  ],
  declarations: [
    MediaTypeComponent,
    ViewMediaDialogComponent
  ],
  exports: [
    MediaTypeComponent
  ],
  entryComponents: [
    ViewMediaDialogComponent
  ]
})
export class MediaTypeModule { }
