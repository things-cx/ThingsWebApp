import { Component, EventEmitter, Output } from '@angular/core';
import { TutorialArea } from '../../tutorial/tutorial.service';

@Component({
  selector: 'app-create-thing',
  templateUrl: './create-thing.component.html',
  styleUrls: ['./create-thing.component.scss']
})
export class CreateThingComponent {

  @Output() onDone: EventEmitter<TutorialArea> = new EventEmitter();

  constructor() { }

  done() {
    this.onDone.emit(TutorialArea.createThing);
  }
}
