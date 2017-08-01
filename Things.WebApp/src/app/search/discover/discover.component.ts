import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ThingsController, Things } from 'api-typings/bundle';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {

  isProcessing = true;
  model: Things.Api.ViewModels.Home.DiscoverViewModel;
  skip = 0;

  constructor(private thingsController: ThingsController) { }

  ngOnInit() {
    const viewModel = new Things.Api.ViewModels.Thing.DiscoverThingsViewModel;
    viewModel.skip = this.skip;

    this.thingsController.discoverThings(viewModel).subscribe(data => {
      this.model = data;
      this.isProcessing = false;
    }, error => {
      this.isProcessing = false;
    });
  }

  loadMore() {
    this.isProcessing = true;

    this.skip += 10;
    const viewModel = new Things.Api.ViewModels.Thing.DiscoverThingsViewModel;
    viewModel.skip = this.skip;

    this.thingsController.discoverThings(viewModel).subscribe(data => {
      this.model.things = this.model.things.concat(data.things);
      this.isProcessing = false;
    });
  }
}
