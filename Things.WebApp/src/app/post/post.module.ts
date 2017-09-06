import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from 'ngx-clipboard';
import { PostComponent } from './post/post.component';
import { PostRoutingModule } from '../post/post-routing.module';
import { PostItemComponent } from './post-item/post-item.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { PostLikesComponent } from './post-likes/post-likes.component';
import { UserPostsLikedComponent } from './user-posts-liked/user-posts-liked.component';
import { MediaTypeModule } from '../shared/media-type/media-type.module';
import { ReportPostDialogComponent } from './report-post-dialog/report-post-dialog.component';
import { SharePostDialogComponent } from './share-post-dialog/share-post-dialog.component';
import {
  MdButtonModule,
  MdCardModule,
  MdProgressSpinnerModule,
  MdIconModule,
  MdDialogModule,
  MdMenuModule,
  MdSnackBarModule,
  MdTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    PostRoutingModule,
    MdButtonModule,
    MdCardModule,
    MdProgressSpinnerModule,
    MdIconModule,
    MdMenuModule,
    MediaTypeModule,
    MdSnackBarModule,
    ClipboardModule,
    MdDialogModule,
    MdTooltipModule
  ],
  entryComponents: [
    ReportPostDialogComponent,
    SharePostDialogComponent
  ],
  declarations: [
    PostComponent,
    PostItemComponent,
    UserPostsComponent,
    PostLikesComponent,
    UserPostsLikedComponent,
    ReportPostDialogComponent,
    SharePostDialogComponent
  ],
  exports: [
    PostItemComponent
  ]
})
export class PostModule { }
