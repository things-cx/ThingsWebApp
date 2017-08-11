import { Component, OnInit, SimpleChanges, Input, OnChanges } from '@angular/core';
import { Things, PostController } from 'api-typings/bundle';

@Component({
  selector: 'app-activity-list-posts',
  templateUrl: './activity-list-posts.component.html',
  styleUrls: ['./activity-list-posts.component.scss']
})
export class ActivityListPostsComponent implements OnInit, OnChanges {

  activityList: Things.Api.ViewModels.Post.ThingActivityListViewModel[];
  skip = 0;
  isProcessing = true;
  @Input() officialPosts: boolean;

  constructor(private postController: PostController) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'officialPosts') {
        this.activityList = [];
        this.skip = 0;
        this.getActivityList();
      }
    }
  }

  getActivityList() {
    this.isProcessing = true;

    const viewModel = new Things.Api.ViewModels.Post.GetThingActivityListViewModel;
    viewModel.getOfficial = this.officialPosts;
    viewModel.skip = this.skip;

    this.postController.getThingActivityList(viewModel).subscribe(data => {
      this.isProcessing = false;
      this.activityList = data;
    });
  }

  loadMore() {
    this.isProcessing = true;

    this.skip += 10;
    const viewModel = new Things.Api.ViewModels.Post.GetThingActivityListViewModel;
    viewModel.getOfficial = this.officialPosts;
    viewModel.skip = this.skip;

    this.postController.getThingActivityList(viewModel).subscribe(data => {
      this.isProcessing = false;
      this.activityList = data;
    });
  }
}
