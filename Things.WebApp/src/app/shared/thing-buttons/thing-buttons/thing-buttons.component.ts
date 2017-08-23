import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-thing-buttons',
  templateUrl: './thing-buttons.component.html',
  styleUrls: ['./thing-buttons.component.scss']
})
export class ThingButtonsComponent implements OnInit {

  @Input() buttons: Object[];

  constructor() { }

  ngOnInit() {
  }

}
