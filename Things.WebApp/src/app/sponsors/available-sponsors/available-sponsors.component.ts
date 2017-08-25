import { Component, OnInit } from '@angular/core';
import { Things, ThingsController } from 'api-typings/bundle';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-available-sponsors',
  templateUrl: './available-sponsors.component.html',
  styleUrls: ['./available-sponsors.component.scss']
})
export class AvailableSponsorsComponent implements OnInit {

  thingId: number;
  things: Things.Api.Models.Thing[];
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
        this.things = [];
        this.skip = 0;
        this.getAvailableSponsors();
      }
    });
  }

  getAvailableSponsors() {
    this.isProcessing = true;

    const viewModel = new Things.Api.ViewModels.SkipViewModel;
    viewModel.skip = this.skip;

    this.thingsController.getAvailableThingSponsors(this.thingId, viewModel).subscribe(data => {
      this.isProcessing = false;
      this.things = data;
    });
  }

  loadMore() {
    this.isProcessing = true;

    this.skip += 10;
    const viewModel = new Things.Api.ViewModels.SkipViewModel;
    viewModel.skip = this.skip;

    this.thingsController.getAvailableThingSponsors(this.thingId, viewModel).subscribe(data => {
      this.isProcessing = false;
      this.things = this.things.concat(data);
    });
  }
}
