import { Component, OnInit } from '@angular/core';
import { Things, PostController } from 'api-typings/bundle';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {

  activityList: Things.Api.ViewModels.Post.ThingActivityListViewModel[];
  skip = 0;
  isProcessing = true;
  officialPosts = true;

  constructor(private postController: PostController,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParams => {
      if (queryParams.has('unofficial')) {
        this.officialPosts = !(queryParams.get('unofficial') === 'true');
      }
      this.activityList = [];
      this.skip = 0;
      this.getActivityList();
    });
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
