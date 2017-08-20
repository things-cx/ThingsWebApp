import { Component, OnInit, Input } from '@angular/core';
import { ThingsController, Things } from 'api-typings/bundle';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  thingModel: Things.Api.Models.ThingModel;
  thingId: number;
  isProcessing = true;

  constructor(private thingsController: ThingsController,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.thingId = +params.get('id');
        this.getThing();
      }
    });
  }

  getThing() {
    this.thingsController.readThing(this.thingId).subscribe(
      data => {
        this.thingModel = data;
        this.isProcessing = false;
      });
  }

  onDelete() {
    this.isProcessing = true;

    this.thingsController.deleteThing(this.thingId).subscribe(
      data => {
        if (data.id != null) {
          // Navigate to parent
          const link = [`/thing`, data.id];
          this.router.navigate(link);
        } else {
          const link = ['/search'];
          this.router.navigate(link);
        }
      });
  }
}
