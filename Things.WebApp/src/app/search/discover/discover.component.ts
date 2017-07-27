import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ThingsController, Things } from 'api-typings/bundle';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {

  isProcessing = true;
  model: Things.Api.ViewModels.Home.DiscoverViewModel;

  constructor(private thingsController: ThingsController) { }

  ngOnInit() {
    this.thingsController.discoverThings().subscribe(data => {
      this.model = data;
      this.isProcessing = false;
    }, error => {
      this.isProcessing = false;
    });
  }
}
