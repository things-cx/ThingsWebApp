import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TutorialArea } from '../../tutorial/tutorial.service';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-create-public-thing',
  templateUrl: './create-public-thing.component.html',
  styleUrls: ['./create-public-thing.component.scss']
})
export class CreatePublicThingComponent {

  logedInUserId: number = this.authService.getLogedInUserId();

  @Output() onDone: EventEmitter<TutorialArea> = new EventEmitter();

  constructor(private authService: AuthService) { }

  done() {
    this.onDone.emit(TutorialArea.createPublicThing);
  }
}
