import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ThingsController, Things } from 'api-typings/bundle';

@Component({
  selector: 'app-thing-user-details',
  templateUrl: './thing-user-details.component.html',
  styleUrls: ['./thing-user-details.component.scss']
})
export class ThingUserDetailsComponent implements OnChanges {

  @Input() id: number;
  @Input() logedInUserId: number;
  isProcessing = true;
  userThingDetails: Things.Api.ViewModels.Thing.GetUserThingDetailsViewModel;

  constructor(private thingsController: ThingsController) {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'id') {
        this.getUserThingDetails();
      }
    }
  }

  getUserThingDetails() {
    this.isProcessing = true;
    this.thingsController.getUserThingDetails(this.id).subscribe(data => {
      this.isProcessing = false;
      this.userThingDetails = data;
    });
  }
}
