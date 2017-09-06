import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Things, PostController } from 'api-typings/bundle';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { NoContentMediaDialogComponent } from '../no-content-media-dialog/no-content-media-dialog.component';

@Component({
  selector: 'app-thing-media-items',
  templateUrl: './thing-media-items.component.html',
  styleUrls: ['./thing-media-items.component.scss']
})
export class ThingMediaItemsComponent implements OnInit, OnChanges {

  @Input() thingId: number;
  @Input() isOfficial: boolean;
  posts: Things.Api.Models.Post.Post[] = [];
  skip = 0;
  isProcessing = true;

  constructor(private postController: PostController,
    private router: Router,
    public dialog: MdDialog) { }

  ngOnInit() {
    this.getThingPosts();
  }

  // Check @Input() thingId for changes to update posts
  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'thingId' &&
        !changes[propName].firstChange &&
        changes[propName].currentValue !== changes[propName].previousValue) {
        this.skip = 0;
        this.posts = [];
        this.getThingPosts();
      }
    }
  }

  getThingPosts() {
    this.isProcessing = true;
    // TODO: impliment preloading (spinner) while content is loading. This is actually applicable to all http requests!
    // TODO: not sure if this shouldn't also be in the ngOnInit or is ngOnChanges fine?
    const viewModel = new Things.Api.ViewModels.Post.GetThingPostsViewModel;
    viewModel.skip = this.skip;

    this.getMediaPosts(viewModel);
  }

  loadMore() {
    this.isProcessing = true;

    this.skip += 10;
    const viewModel = new Things.Api.ViewModels.Post.GetThingPostsViewModel;
    viewModel.skip = this.skip;

    this.getMediaPosts(viewModel);
  }

  getMediaPosts(viewModel: Things.Api.ViewModels.Post.GetThingPostsViewModel) {
    if (this.isOfficial) {
      this.postController.getOfficialThingMediaPosts(this.thingId, viewModel).subscribe(data => {
        this.isProcessing = false;
        this.posts = data;
      });
    } else {
      this.postController.getThingMediaPosts(this.thingId, viewModel).subscribe(data => {
        this.isProcessing = false;
        this.posts = data;
      });
    }
  }

  goToPost(post: Things.Api.Models.Post.Post) {
    this.router.navigate(['/post/post', post.uId]);
  }

  openNoContentDialog() {
    this.dialog.open(NoContentMediaDialogComponent);
  }
}
