import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MentionComponent } from 'app/shared/editor/mention/mention.component';
import { EditorComponent } from 'app/shared/editor/editor/editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MediaTypeModule } from 'app/shared/media-type/media-type.module';
import {
  MdButtonModule,
  MdInputModule,
  MdAutocompleteModule,
  MdProgressSpinnerModule,
  MdCardModule,
  MdIconModule,
  MdDialogModule,
  MdMenuModule,
  MdTooltipModule,
  MdSelectModule
} from '@angular/material';
import { MarkdownHelperDialogComponent } from './markdown-helper-dialog/markdown-helper-dialog.component';

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
    MediaTypeModule,
    MdMenuModule,
    MdTooltipModule,
    MdSelectModule
  ],
  declarations: [
    EditorComponent,
    MentionComponent,
    MarkdownHelperDialogComponent
  ],
  exports: [
    EditorComponent,
    MentionComponent
  ],
  entryComponents: [
    MentionComponent,
    MarkdownHelperDialogComponent
  ]
})
export class EditorModule { }
