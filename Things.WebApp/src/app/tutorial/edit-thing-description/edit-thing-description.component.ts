import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TutorialArea } from '../../tutorial/tutorial.service';

@Component({
  selector: 'app-edit-thing-description',
  templateUrl: './edit-thing-description.component.html',
  styleUrls: ['./edit-thing-description.component.scss']
})
export class EditThingDescriptionComponent {

  @Output() onDone: EventEmitter<TutorialArea> = new EventEmitter();

  constructor() { }

  done() {
    this.onDone.emit(TutorialArea.editThingDescription);
  }
}
