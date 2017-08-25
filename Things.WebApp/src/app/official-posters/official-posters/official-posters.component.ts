import { Component, OnInit } from '@angular/core';
import { ThingsController, Things } from 'api-typings/bundle';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-followers',
  templateUrl: './official-posters.component.html',
  styleUrls: ['./official-posters.component.scss']
})
export class OfficialPostersComponent implements OnInit {

  thingId: number;
  officialPosters: Things.Api.ViewModels.Thing.GetThingOfficialPostersViewModel[];
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
        this.officialPosters = [];
        this.skip = 0;
        this.getOfficialPosters();
      }
    });
  }

  getOfficialPosters() {
    this.isProcessing = true;

    const viewModel = new Things.Api.ViewModels.Thing.GetThingFollowersViewModel;
    viewModel.skip = this.skip;

    this.thingsController.getOfficialPosters(this.thingId, viewModel).subscribe(
      data => {
        this.officialPosters = data;
        this.isProcessing = false;
      });
  }

  loadMore() {
    this.isProcessing = true;

    this.skip += 10;
    const viewModel = new Things.Api.ViewModels.Thing.GetThingFollowersViewModel;
    viewModel.skip = this.skip;

    this.thingsController.getOfficialPosters(this.thingId, viewModel).subscribe(
      data => {
        this.officialPosters.concat(data);
        this.isProcessing = false;
      });
  }
}
