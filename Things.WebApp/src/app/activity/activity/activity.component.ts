import { Component, OnInit } from '@angular/core';
import { Things, ThingsController } from 'api-typings/bundle';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  thingId: number;
  activities: Things.Api.ViewModels.Activity.ThingActivityViewModel[];
  activityTypeEnum = Things.Api.ViewModels.Activity.ActivityType;
  skip = 0;
  isProcessing = true;

  constructor(private thingsController: ThingsController,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
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

    const viewModel = new Things.Api.ViewModels.Activity.GetThingActivityViewModel;
    viewModel.skip = this.skip;

    this.thingsController.getThingActivity(this.thingId, viewModel).subscribe(data => {
      this.isProcessing = false;
      this.activities = data;
      console.log(data);
    });
  }

  loadMore() {
    this.isProcessing = true;

    this.skip += 10;

    const viewModel = new Things.Api.ViewModels.Activity.GetThingActivityViewModel;
    viewModel.skip = this.skip;

    this.thingsController.getThingActivity(this.thingId, viewModel).subscribe(data => {
      this.isProcessing = false;
      this.activities = this.activities.concat(data);
    });
  }
}
