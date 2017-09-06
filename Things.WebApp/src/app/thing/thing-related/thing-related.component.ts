import { Component, SimpleChanges, Input, OnChanges } from '@angular/core';
import { ThingsController, Things } from 'api-typings/bundle';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';
import { NoContentRelatedDialogComponent } from '../no-content-related-dialog/no-content-related-dialog.component';

@Component({
  selector: 'app-thing-related',
  templateUrl: './thing-related.component.html',
  styleUrls: ['./thing-related.component.scss']
})
export class ThingRelatedComponent implements OnChanges {

  // TODO: should this be a seperate call when first entering thing details
  // (info can be fetched in one call and then afterwards only children if needed)

  @Input() id: number;
  things: Things.Api.Models.Thing[];
  isProcessing = true;

  constructor(private thingsController: ThingsController,
    public dialog: MdDialog) {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'id') {
        this.things = [];
        this.getRelatedThings();
      }
    }
  }

  getRelatedThings() {
    this.isProcessing = true;
    // TODO: impliment preloading (spinner) while content is loading. This is actually applicable to all http requests!
    // TODO: not sure if this shouldn't also be in the ngOnInit or is ngOnChanges fine?
    this.thingsController.readRelatedThings(this.id).subscribe(data => {
      this.isProcessing = false;
      this.things = data;
    });
  }

  openNoContentDialog() {
    this.dialog.open(NoContentRelatedDialogComponent);
  }
}
