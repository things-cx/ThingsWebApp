import { Component, OnInit } from '@angular/core';
import { Things, PostController } from 'api-typings/bundle';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-posts-activity',
  templateUrl: './posts-activity.component.html',
  styleUrls: ['./posts-activity.component.scss']
})
export class PostsActivityComponent implements OnInit {

  thingId: number;
  activities: Things.Api.Models.Post.PostModel[];
  skip = 0;
  isProcessing = true;

  constructor(private postController: PostController,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    // TODO: get unofficial activity
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.thingId = +params.get('id');
        this.activities = [];
        this.skip = 0;
        this.getActivity();
      }
    });
  }

  getActivity() {
    this.isProcessing = true;

    const viewModel = new Things.Api.ViewModels.Post.GetThingActivityViewModel;
    viewModel.getOfficial = true;
    viewModel.skip = this.skip;

    this.postController.getThingActivity(this.thingId, viewModel).subscribe(data => {
      this.isProcessing = false;
      this.activities = data;
    });
  }

  loadMore() {
    this.isProcessing = true;

    this.skip += 10;

    const viewModel = new Things.Api.ViewModels.Post.GetThingActivityViewModel;
    viewModel.getOfficial = true;
    viewModel.skip = this.skip;

    this.postController.getThingActivity(this.thingId, viewModel).subscribe(data => {
      this.isProcessing = false;
      this.activities = this.activities.concat(data);
    });
  }
}
