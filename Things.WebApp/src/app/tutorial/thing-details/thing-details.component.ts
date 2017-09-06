import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TutorialArea } from '../../tutorial/tutorial.service';

@Component({
  selector: 'app-thing-details',
  templateUrl: './thing-details.component.html',
  styleUrls: ['./thing-details.component.scss']
})
export class ThingDetailsComponent {

  @Output() onDone: EventEmitter<TutorialArea> = new EventEmitter();

  constructor() { }

  done() {
    this.onDone.emit(TutorialArea.thingDetails);
  }
}
