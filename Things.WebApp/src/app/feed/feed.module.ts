import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed/feed.component';
import { FeedRoutingModule } from 'app/feed/feed-routing.module';
import { MdButtonModule, MdCardModule, MdMenuModule, MdIconModule, MdDialogModule, MdProgressSpinnerModule } from '@angular/material';
import { PostModule } from 'app/post/post.module';
import { NoContentDialogComponent } from './no-content-dialog/no-content-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FeedRoutingModule,
    MdButtonModule,
    MdCardModule,
    MdMenuModule,
    MdIconModule,
    MdDialogModule,
    MdProgressSpinnerModule,
    PostModule
  ],
  declarations: [
    FeedComponent,
    NoContentDialogComponent
  ],
  entryComponents: [
    NoContentDialogComponent
  ]
})
export class FeedModule { }
