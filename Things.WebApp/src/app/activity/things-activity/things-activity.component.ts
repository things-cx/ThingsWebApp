import { Component, OnInit } from '@angular/core';
import { Things, ThingsController } from 'api-typings/bundle';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-things-activity',
  templateUrl: './things-activity.component.html',
  styleUrls: ['./things-activity.component.scss']
})
export class ThingsActivityComponent implements OnInit {

  thingId: number;
  activities: Things.Api.ViewModels.Thing.GetThingThingsActivity[];
  skip = 0;
  isProcessing = true;

  constructor(private thingsController: ThingsController,
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

    const viewModel = new Things.Api.ViewModels.SkipViewModel;
    viewModel.skip = this.skip;

    this.thingsController.getThingThingsActivity(this.thingId, viewModel).subscribe(data => {
      this.isProcessing = false;
      this.activities = data;
    });
  }

  loadMore() {
    this.isProcessing = true;

    this.skip += 10;

    const viewModel = new Things.Api.ViewModels.SkipViewModel;
    viewModel.skip = this.skip;

    this.thingsController.getThingThingsActivity(this.thingId, viewModel).subscribe(data => {
      this.isProcessing = false;
      this.activities = this.activities.concat(data);
    });
  }
}
