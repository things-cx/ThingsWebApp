import { Component, OnInit, Input } from '@angular/core';
import { Things, ThingsController } from 'api-typings/bundle';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicThingService } from '../../shared/public-thing.service';
import { MdSnackBar } from '@angular/material';
import { TutorialService, TutorialArea } from '../../tutorial/tutorial.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  thing: Things.Api.Models.ThingModel;
  thingId: number;
  isProcessing = true;

  constructor(private thingsController: ThingsController,
    private route: ActivatedRoute,
    private tutorial: TutorialService,
    private router: Router,
    private publicThingService: PublicThingService,
    public snackBar: MdSnackBar) { }

  ngOnInit() {
    if (!this.tutorial.hasDoneTutorial(TutorialArea.editThingTags)) {
      this.router.navigate(['/tutorial', TutorialArea.editThingTags]);
    }

    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.thingId = +params.get('id');
        this.getThing();
      }
    });
  }

  getThing() {
    this.thingsController.readThing(this.thingId).subscribe(data => {
      this.thing = data;
      this.isProcessing = false;
    });
  }

  onSave(tags: string[]) {
    const viewModel = new Things.Api.ViewModels.Thing.Edit.EditThingTagsViewModel;
    viewModel.tags = tags;

    const rootPublicThingId = this.publicThingService.getRootThingIdFromThing(this.thing.parentHierarchy, this.thing.thing.id);
    if (rootPublicThingId === null) {
      this.thingsController.editThingTags(this.thingId, viewModel).subscribe(data => {
        const link = ['/edit', this.thingId];
        this.router.navigate(link);
      });
    } else {
      const token = this.publicThingService.getPublicThingValue(rootPublicThingId);
      if (token !== null) {
        this.thingsController.editPublicThingTags(this.thingId, token, viewModel).subscribe(data => {
          const link = ['/edit', this.thingId];
          this.router.navigate(link);
        });
      } else {
        const snackBarRef = this.snackBar.open('Unauthorized access!', 'Authorize', {
          duration: 6000
        });

        // Snack bar authorize
        snackBarRef.onAction().subscribe(() => {
          // The id from the public thing service could potentially not be a root public thing ID
          const link = ['/authorize', this.publicThingService.getRootThingIdFromThing(this.thing.parentHierarchy, this.thing.thing.id)];
          this.router.navigate(link, { queryParams: { returnUrl: this.router.url }});
        });
      }
    }
  }
}
