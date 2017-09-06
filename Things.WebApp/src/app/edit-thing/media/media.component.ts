import { Component, OnInit, Input } from '@angular/core';
import { Things, ThingsController } from 'api-typings/bundle';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicThingService } from '../../shared/public-thing.service';
import { MdSnackBar } from '@angular/material';
import { TutorialArea, TutorialService } from '../../tutorial/tutorial.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  thing: Things.Api.Models.ThingModel;
  thingId: number;
  isProcessing = true;
  mediaItems: string[] = [];
  editedMediaItems = false;
  hasHttpWarning: boolean;

  constructor(private thingsController: ThingsController,
    private route: ActivatedRoute,
    private router: Router,
    private publicThingService: PublicThingService,
    public snackBar: MdSnackBar,
    private tutorial: TutorialService) { }

  ngOnInit() {
    if (!this.tutorial.hasDoneTutorial(TutorialArea.editThingMedia)) {
      this.router.navigate(['/tutorial', TutorialArea.editThingMedia]);
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
      if (this.thing.thing.media != null) {
        this.mediaItems = this.thing.thing.media;
      }
    });
  }

  onCustomAdd(url: string) {
    if (url.startsWith('http://')) {
      this.hasHttpWarning = true;
    } else {
      this.hasHttpWarning = false;
      this.onAdd(url);
    }
  }

  onAdd(url: string) {
    if (this.mediaItems == null) {
      this.mediaItems = [];
    }
    if (this.mediaItems.length < 10) {
      this.mediaItems.push(url);
      this.editedMediaItems = true;
    }
  }

  onRemove(url: string) {
    this.mediaItems.splice(this.mediaItems.findIndex(x => x === url), 1);
    this.editedMediaItems = true;
  }

  onSave() {
    const viewModel = new Things.Api.ViewModels.Thing.Edit.EditThingMediaViewModel;
    viewModel.media = this.mediaItems;

    const rootPublicThingId = this.publicThingService.getRootThingIdFromThing(this.thing.parentHierarchy, this.thing.thing.id);
    if (rootPublicThingId === null) {
      this.thingsController.editThingMedia(this.thingId, viewModel).subscribe(data => {
        const link = ['/edit', this.thingId];
        this.router.navigate(link);
      });
    } else {
      const token = this.publicThingService.getPublicThingValue(rootPublicThingId);
      if (token !== null) {
        this.thingsController.editPublicThingMedia(this.thingId, token, viewModel).subscribe(data => {
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
