import { Component, EventEmitter, Output } from '@angular/core';
import { TutorialArea } from '../../tutorial/tutorial.service';

@Component({
  selector: 'app-create-shortcut-thing',
  templateUrl: './create-shortcut-thing.component.html',
  styleUrls: ['./create-shortcut-thing.component.scss']
})
export class CreateShortcutThingComponent {

  @Output() onDone: EventEmitter<TutorialArea> = new EventEmitter();

  constructor() { }

  done() {
    this.onDone.emit(TutorialArea.createShortcutThing);
  }
}
