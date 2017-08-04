import { Component, OnInit } from '@angular/core';
import { ThingsController, Things } from 'api-typings/bundle';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  things: Things.Api.Models.Thing[];
  tag: string;
  skip = 0;
  isProcessing = true;

  constructor(private thingsController: ThingsController,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('label')) {
        this.tag = params.get('label');
        this.things = [];
        this.skip = 0;
        this.getThingsForTag();
      }
    });
  }

  getThingsForTag() {
    this.isProcessing = true;

    const viewModel = new Things.Api.ViewModels.Thing.GetThingForTagViewModel;
    viewModel.tag = this.tag;
    viewModel.skip = this.skip;

    this.thingsController.getThingsForTag(viewModel).subscribe(data => {
      this.isProcessing = false;
      this.things = data;
    });
  }

  loadMore() {
    this.isProcessing = true;

    this.skip += 10;
    const viewModel = new Things.Api.ViewModels.Thing.GetThingForTagViewModel;
    viewModel.tag = this.tag;
    viewModel.skip = this.skip;

    this.thingsController.getThingsForTag(viewModel).subscribe(data => {
      this.isProcessing = false;
      this.things = this.things.concat(data);
    });
  }
}
