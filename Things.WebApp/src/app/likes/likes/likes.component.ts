import { Component, OnInit } from '@angular/core';
import { ThingsController, Things } from 'api-typings/bundle';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss']
})
export class LikesComponent implements OnInit {

  thingId: number;
  things: Things.Api.Models.Thing[];
  skip = 0;
  isProcessing = true;
  isUserLikes = false;

  constructor(private thingsController: ThingsController,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    // TODO: don't think this is the correct way to do this!
    this.route.url.subscribe(urlSegment => {
      if (urlSegment.findIndex(x => x.path === 'user') > -1) {
        this.isUserLikes = true;
      }
    });

    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.thingId = +params.get('id');
        this.things = [];
        this.skip = 0;
        this.getThingLikes();
      }
    });
  }

  getThingLikes() {
    this.isProcessing = true;

    const viewModel = new Things.Api.ViewModels.Thing.GetThingLikesViewModel;
    viewModel.skip = this.skip;

    if (!this.isUserLikes) {
      this.thingsController.getThingLikes(this.thingId, viewModel).subscribe(data => {
        this.isProcessing = false;
        this.things = data;
      });
    } else {
      this.thingsController.getUserThingLikes(this.thingId, viewModel).subscribe(data => {
        this.isProcessing = false;
        this.things = data;
      });
    }
  }

  loadMore() {
    this.isProcessing = true;

    this.skip += 10;
    const viewModel = new Things.Api.ViewModels.Thing.GetThingLikesViewModel;
    viewModel.skip = this.skip;

    if (!this.isUserLikes) {
      this.thingsController.getThingLikes(this.thingId, viewModel).subscribe(data => {
        this.isProcessing = false;
        this.things = this.things.concat(data);
      });
    } else {
      this.thingsController.getUserThingLikes(this.thingId, viewModel).subscribe(data => {
        this.isProcessing = false;
        this.things = this.things.concat(data);
      });
    }
  }
}
