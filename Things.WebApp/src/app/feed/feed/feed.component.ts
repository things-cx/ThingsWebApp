import { Component, OnInit } from '@angular/core';
import { Things, PostController } from 'api-typings/bundle';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { NoContentDialogComponent } from 'app/feed/no-content-dialog/no-content-dialog.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  posts: Things.Api.Models.Post.PostModel[];
  skip = 0;
  isProcessing = true;

  constructor(private postController: PostController,
    private router: Router,
    public dialog: MdDialog) { }

  ngOnInit() {
    this.getFeed();
  }

  getFeed() {
    this.isProcessing = true;
    const viewModel = new Things.Api.ViewModels.Post.GetFeedViewModel;
    viewModel.skip = this.skip;

    this.postController.getFeed(viewModel).subscribe(data => {
      this.isProcessing = false;
      this.posts = data;
    });
  }

  loadMore() {
    this.isProcessing = true;

    this.skip += 10;
    const viewModel = new Things.Api.ViewModels.Post.GetFeedViewModel;
    viewModel.skip = this.skip;

    this.postController.getFeed(viewModel).subscribe(data => {
      this.isProcessing = false;
      this.posts = this.posts.concat(data);
    });
  }

  goToPost(post: Things.Api.Models.Post.Post) {
    this.router.navigate(['/post/post', post.uId]);
  }

  openNoContentDialog() {
    this.dialog.open(NoContentDialogComponent);
  }
}
