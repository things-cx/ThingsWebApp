import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Things, PostController } from 'api-typings/bundle';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { MdDialog } from '@angular/material';
import { SharePostDialogComponent } from '../../post/share-post-dialog/share-post-dialog.component';
import { ReportPostDialogComponent } from '../../post/report-post-dialog/report-post-dialog.component';
import { environment } from 'environments/environment';
import * as emojione from 'emojione';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit, OnChanges {

  @Input() postModel: Things.Api.Models.Post.PostModel;
  @Input() clickable: boolean;
  @Input() replyView = false;
  isProcessingLike = false;
  logedInUserId: number = this.authService.getLogedInUserId();

  constructor(private router: Router,
    private postController: PostController,
    private authService: AuthService,
    public dialog: MdDialog) { }

  ngOnInit() {
    // TODO: doing thing on ever post item seems wrong and poor perf
    this.authService.logedInUserId$.subscribe(id => {
      this.logedInUserId = id;
    });
  }

  // Check @Input() postModel for changes to update posts
  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'postModel') {
        if (this.postModel != null && this.postModel.post.content !== null && this.postModel.post.content !== '') {
          this.loadMentions();
          this.loadEmoji();
        }
      }
    }
  }

  loadMentions() {
    // TODO: this could be made more performant
    let description = this.postModel.post.content;

    // Mentions
    for (const mention of this.postModel.mentions) {
      let linkName = this.postModel.post.content.substring(mention.indicies[0], mention.indicies[1]);
      let linkHref = '';
      if (mention.version !== null) {
        linkHref = `/thing/${mention.thingId}/${mention.version}`;
      } else {
        linkHref = `/thing/${mention.thingId}`;
      }
      const link = `<a class="thing-ref" href="${linkHref}">${linkName}</a>`;

      // Escape all regex characters with backslashs (\)
      linkName = linkName.replace(/[.+?^${}()|[\]\\]/g, '\\$&');

      description = description.replace(new RegExp(`(?!>)(${linkName})(?!@)`, 'g'), link);
    }

    // Urls
    description = description.replace(/(https?:\/\/[^\s]+)/g, function (url) {
      return '<a target="_blank" href="' + url + '">' + url + '</a>';
    })

    this.postModel.post.content = description;
  }

  loadEmoji() {
    (<any>emojione).ascii = true;
    const output = emojione.toImage(this.postModel.post.content);
    this.postModel.post.content = output;
  }

  goToPost() {
    if (this.clickable) {
      this.router.navigate(['/post/post', this.postModel.post.uId]);
    }
  }

  like(event: MouseEvent) {
    event.stopPropagation();

    this.isProcessingLike = true;

    const viewModel = new Things.Api.ViewModels.Post.PostLikeViewModel;
    viewModel.likePostId = this.postModel.post.id;
    this.postController.createPostLike(viewModel).subscribe(() => {
      this.postModel.post.likes++;
      this.postModel.liked = true;
      this.isProcessingLike = false;
    });
  }

  unlike(event: MouseEvent) {
    event.stopPropagation();

    this.isProcessingLike = true;

    const viewModel = new Things.Api.ViewModels.Post.PostLikeViewModel;
    viewModel.likePostId = this.postModel.post.id;
    this.postController.deletePostLike(viewModel).subscribe(() => {
      this.postModel.post.likes--;
      this.postModel.liked = false;
      this.isProcessingLike = false;
    });
  }

  goToLikes(event: MouseEvent) {
    event.stopPropagation();

    const link = ['/post/likes', this.postModel.post.id];
    this.router.navigate(link);
  }

  openShareDialog() {
    const dialogRef = this.dialog.open(SharePostDialogComponent);

    const link = ['/post/post', this.postModel.post.uId];
    dialogRef.componentInstance.link = environment.hostUrlForSharingToWeb + this.router.createUrlTree(link).toString();
  }

  openReportDialog() {
    const dialogRef = this.dialog.open(ReportPostDialogComponent);
    dialogRef.componentInstance.postUId = this.postModel.post.uId;
  }

  preventDefault(event: Event) {
    event.stopPropagation();
  }

  reply(event: Event) {
    this.router.navigate(['/create-post'], { queryParams: { replyTo: this.postModel.post.uId } });
  }
}
