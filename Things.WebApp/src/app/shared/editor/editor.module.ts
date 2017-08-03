import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MentionDialogComponent } from 'app/shared/editor/mention-dialog/mention-dialog.component';
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
    MentionDialogComponent,
    MarkdownHelperDialogComponent
  ],
  exports: [
    EditorComponent,
    MentionDialogComponent
  ],
  entryComponents: [
    MentionDialogComponent,
    MarkdownHelperDialogComponent
  ]
})
export class EditorModule { }
