import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThingsController, Things } from 'api-typings/bundle';
import { PublicThingService } from '../../shared/public-thing.service';
import { MdSnackBar } from '@angular/material';
import { TutorialArea, TutorialService } from '../../tutorial/tutorial.service';
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
  version: number;
  isProcessing = true;

  constructor(private thingsController: ThingsController,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id') && params.has('version')) {
        this.version = +params.get('version');
        this.thingId = +params.get('id');

      } else if (params.has('id')) {
        this.version = null;
        this.thingId = +params.get('id');
      }

      this.getThing();
    });
  }

  getThing() {
    window.scrollTo(0, 0);

    // TODO: potentially allow for hierarchy to be passed into id param
    // TODO: catch error from server if any
    this.thingsController.readThingDescription(this.thingId, this.version).subscribe(data => {
      this.thingModel = data;
      // Render markdown
      this.thingModel.description.content = marked(this.thingModel.description.content);
      // Render emoji
      (<any>emojione).ascii = true;
      this.thingModel.description.content = emojione.toImage(this.thingModel.description.content);

      this.isProcessing = false;
    });
  }
}
