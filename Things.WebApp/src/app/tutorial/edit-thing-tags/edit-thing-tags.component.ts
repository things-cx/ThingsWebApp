import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TutorialArea } from '../../tutorial/tutorial.service';

@Component({
  selector: 'app-edit-thing-tags',
  templateUrl: './edit-thing-tags.component.html',
  styleUrls: ['./edit-thing-tags.component.scss']
})
export class EditThingTagsComponent {

  @Output() onDone: EventEmitter<TutorialArea> = new EventEmitter();

  constructor() { }

  done() {
    this.onDone.emit(TutorialArea.editThingTags);
  }
}
