import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MentionDialogComponent } from '../editor/mention-dialog/mention-dialog.component';
import { EditorComponent } from '../editor/editor/editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MediaTypeModule } from '../media-type/media-type.module';
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
import { EmojiModule } from '../emoji/emoji.module';

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
    MdSelectModule,
    EmojiModule
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
