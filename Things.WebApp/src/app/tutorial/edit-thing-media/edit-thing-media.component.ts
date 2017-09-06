import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TutorialArea } from '../../tutorial/tutorial.service';

@Component({
  selector: 'app-edit-thing-media',
  templateUrl: './edit-thing-media.component.html',
  styleUrls: ['./edit-thing-media.component.scss']
})
export class EditThingMediaComponent {

  @Output() onDone: EventEmitter<TutorialArea> = new EventEmitter();

  constructor() { }

  done() {
    this.onDone.emit(TutorialArea.editThingMedia);
  }
}
