import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkComponent } from 'app/shared/editor/link/link.component';
import { MentionComponent } from 'app/shared/editor/mention/mention.component';
import { ImageComponent } from 'app/shared/editor/image/image.component';
import { MdButtonModule, MdInputModule, MdAutocompleteModule, MdProgressSpinnerModule, MdCardModule, MdIconModule, MdDialogModule } from '@angular/material';
import { EditorComponent } from 'app/shared/editor/editor/editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MediaTypeModule } from 'app/shared/media-type/media-type.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MdButtonModule,
    MdInputModule,
    MdAutocompleteModule,
    MdProgressSpinnerModule,
    MdCardModule,
    MdIconModule,
    MdDialogModule,
    MediaTypeModule
  ],
  declarations: [
    EditorComponent,
    LinkComponent,
    MentionComponent,
    ImageComponent
  ],
  exports: [EditorComponent, MentionComponent],
  entryComponents: [
    LinkComponent,
    MentionComponent,
    ImageComponent
  ]
})
export class EditorModule { }
