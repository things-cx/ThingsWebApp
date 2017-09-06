import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './create-post/create-post.component';
import { CreatePostRoutingModule } from '../create-post/create-post-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditThingModule } from '../edit-thing/edit-thing.module';
import { EditorModule } from '../shared/editor/editor.module';
import { MentionDialogComponent } from '../shared/editor/mention-dialog/mention-dialog.component';
import { PostModule } from '../post/post.module';
import { EmojiModule } from '../shared/emoji/emoji.module';
import {
  MdButtonModule,
  MdInputModule,
  MdAutocompleteModule,
  MdProgressSpinnerModule,
  MdCardModule,
  MdIconModule,
  MdDialogModule,
  MdTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    CreatePostRoutingModule,
    ReactiveFormsModule,
    // TODO: Only using media importer. Move out and don't import create thing module. doesn't make sense
    MdButtonModule,
    MdInputModule,
    MdAutocompleteModule,
    MdProgressSpinnerModule,
    MdCardModule,
    MdIconModule,
    MdDialogModule,
    // TODO: Rather put these compoents in a shared place
    EditThingModule,
    EditorModule,
    PostModule,
    EmojiModule,
    MdTooltipModule
  ],
  declarations: [
    CreatePostComponent
  ],
  entryComponents: [
    MentionDialogComponent
  ]
})
export class CreatePostModule { }
