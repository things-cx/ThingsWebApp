import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { ThingsController, Things } from 'api-typings/bundle';

@Component({
  selector: 'app-activity-list-things',
  templateUrl: './activity-list-things.component.html',
  styleUrls: ['./activity-list-things.component.scss']
})
export class ActivityListThingsComponent implements OnInit {

  activityList: Things.Api.ViewModels.Post.ThingActivityListViewModel[];
  skip = 0;
  isProcessing = true;
  @Input() officialPosts: boolean;

  constructor(private thingsController: ThingsController) { }

  ngOnInit() {
    this.activityList = [];
    this.skip = 0;
    this.getActivityList();
  }

  getActivityList() {
    this.isProcessing = true;

    const viewModel = new Things.Api.ViewModels.SkipViewModel;
    viewModel.skip = this.skip;

    this.thingsController.getThingActivityList(viewModel).subscribe(data => {
      this.isProcessing = false;
      this.activityList = data;
    });
  }

  loadMore() {
    this.isProcessing = true;

    this.skip += 10;
    const viewModel = new Things.Api.ViewModels.SkipViewModel;
    viewModel.skip = this.skip;

    this.thingsController.getThingActivityList(viewModel).subscribe(data => {
      this.isProcessing = false;
      this.activityList = data;
    });
  }
}
