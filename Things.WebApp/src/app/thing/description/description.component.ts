import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThingsController, Things } from 'api-typings/bundle';
import { PublicThingService } from 'app/shared/public-thing.service';
import { MdSnackBar } from '@angular/material';
import { TutorialArea, TutorialService } from 'app/tutorial/tutorial.service';
import * as marked from 'marked';
import * as emojione from 'emojione';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

  thingModel: Things.Api.Models.ThingModel;
  thingId: number;
  isLoading = true;

  constructor(private thingsController: ThingsController,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.thingId = +this.route.snapshot.params['id'];

    // TODO: This should actually be onRouterParamChange and check other places as well
    // TODO: catch error from server if any
    if (this.thingModel == null) {
      this.thingsController.readThing(this.thingId).subscribe(data => {
        this.thingModel = data;
        // Render markdown
        this.thingModel.description.content = marked(this.thingModel.description.content);
        // Render emoji
        (<any>emojione).ascii = true;
        this.thingModel.description.content = emojione.toImage(this.thingModel.description.content);

        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
    }
  }
}
