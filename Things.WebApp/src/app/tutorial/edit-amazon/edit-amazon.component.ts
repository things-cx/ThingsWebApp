import { Component, EventEmitter, Output } from '@angular/core';
import { TutorialArea } from '../../tutorial/tutorial.service';

@Component({
  selector: 'app-edit-amazon',
  templateUrl: './edit-amazon.component.html',
  styleUrls: ['./edit-amazon.component.scss']
})
export class EditAmazonComponent {

  @Output() onDone: EventEmitter<TutorialArea> = new EventEmitter();

  constructor() { }

  done() {
    this.onDone.emit(TutorialArea.editAmazon);
  }
}
