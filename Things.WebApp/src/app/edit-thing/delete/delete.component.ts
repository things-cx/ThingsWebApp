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
  isLoading = true;

  constructor(private thingsController: ThingsController,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.thingId = +this.route.snapshot.params['id'];

    // TODO: This should actually be onRouterParamChange and check other places as well
    if (this.thingModel == null) {
      this.thingsController.readThing(this.thingId).subscribe(
        data => {
          this.thingModel = data;
          this.isLoading = false;
        });
    } else {
      this.isLoading = false;
    }
  }

  onDelete() {
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
