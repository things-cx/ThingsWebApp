import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThingsController, Things } from 'api-typings/bundle';
import { PublicThingService } from 'app/shared/public-thing.service';
import { MdSnackBar } from '@angular/material';
import { TutorialArea, TutorialService } from 'app/tutorial/tutorial.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

  thing: Things.Api.Models.ThingModel;
  thingId: number;
  isLoading = true;

  constructor(private thingsController: ThingsController,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.thingId = +this.route.snapshot.params['id'];

    // TODO: This should actually be onRouterParamChange and check other places as well
    // TODO: catch error from server if any
    if (this.thing == null) {
      this.thingsController.readThing(this.thingId).subscribe(data => {
        this.thing = data;
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
    }
  }
}
