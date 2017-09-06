import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Things, PostController, ThingsController } from 'api-typings/bundle';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { NoContentPostsDialogComponent } from '../no-content-posts-dialog/no-content-posts-dialog.component';

@Component({
  selector: 'app-thing-posts-items',
  templateUrl: './thing-posts-items.component.html',
  styleUrls: ['./thing-posts-items.component.scss']
})
export class ThingPostsItemsComponent implements OnInit, OnChanges {

  @Input() thingHierarchy: string;
  @Input() thingId: number;
  @Input() isOfficial: boolean;
  posts: Things.Api.Models.Post.PostModel[] = [];
  officialPosters: Things.Api.ViewModels.Thing.GetThingOfficialPostersViewModel[];
  skip = 0;
  isProcessing = true;
  isProcessingOfficialPosters = true;

  constructor(private postController: PostController,
    private thingsController: ThingsController,
    private router: Router,
    public dialog: MdDialog) { }

  ngOnInit() {
    this.getThingPosts();

    if (this.isOfficial) {
      // TODO: this could be made more efficient by combining the requests
      this.getOfficialPosters();
    }
  }

  // Check @Input() thingId for changes to update posts (actually all input changes should be tracked)
  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'thingId' &&
        !changes[propName].firstChange &&
        changes[propName].currentValue !== changes[propName].previousValue) {
        this.skip = 0;
        this.posts = [];
        this.getThingPosts();

        if (this.isOfficial) {
          this.officialPosters = [];
          this.getOfficialPosters();
        }
      }
    }
  }

  getThingPosts() {
    this.isProcessing = true;
    // TODO: impliment preloading (spinner) while content is loading. This is actually applicable to all http requests!
    // TODO: not sure if this shouldn't also be in the ngOnInit or is ngOnChanges fine?
    const viewModel = new Things.Api.ViewModels.Post.GetThingPostsViewModel;
    viewModel.skip = this.skip;

    this.getPost(viewModel);
  }

  loadMore() {
    this.isProcessing = true;

    this.skip += 10;
    const viewModel = new Things.Api.ViewModels.Post.GetThingPostsViewModel;
    viewModel.skip = this.skip;

    this.getPost(viewModel);
  }

  getPost(viewModel: Things.Api.ViewModels.Post.GetThingPostsViewModel) {
    if (this.isOfficial) {
      this.postController.getOfficialThingPosts(this.thingId, viewModel).subscribe(data => {
        this.isProcessing = false;
        this.posts = this.posts.concat(data);
      });
    } else {
      this.postController.getThingPosts(this.thingId, viewModel).subscribe(data => {
        this.isProcessing = false;
        this.posts = this.posts.concat(data);
      });
    }
  }

  goToPost(post: Things.Api.Models.Post.Post) {
    this.router.navigate(['/post/post', post.uId]);
  }

  openNoContentDialog() {
    const dialogRef = this.dialog.open(NoContentPostsDialogComponent);
    dialogRef.componentInstance.thingHierarchy = this.thingHierarchy;
    dialogRef.componentInstance.thingUser = this.thingHierarchy.split('@')[1];
  }

  getOfficialPosters() {
    this.isProcessingOfficialPosters = true;

    const viewModel = new Things.Api.ViewModels.Thing.GetThingFollowersViewModel;
    viewModel.skip = 0;

    this.thingsController.getOfficialPosters(this.thingId, viewModel).subscribe(
      data => {
        this.officialPosters = data;
        this.isProcessingOfficialPosters = false;
      });
  }
}
