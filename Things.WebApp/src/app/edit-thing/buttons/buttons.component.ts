import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ThingsController, Things } from 'api-typings/bundle';
import { PublicThingService } from 'app/shared/public-thing.service';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {

  thing: Things.Api.Models.ThingModel;
  thingId: number;
  isProcessing = false;
  isAddingButton: boolean;
  buttonType: Things.Api.Models.Button.ButtonType;
  form: FormGroup;
  buttonTypeEnum = Things.Api.Models.Button.ButtonType;
  linkTitleType = Things.Api.Models.Button.LinkTitleType;
  // TODO: this should stay in sync with Things.Api.Models.Button.LinkTitleType
  linkButtonTitles = [
    { title: 'Contact Us', value: 1 },
    { title: 'Website', value: 2 }
  ];

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private thingsController: ThingsController,
    private publicThingService: PublicThingService,
    private router: Router,
    public snackBar: MdSnackBar) { }

  ngOnInit() {
    // if (!this.tutorial.hasDoneTutorial(TutorialArea.editAmazon)) {
    //   this.router.navigate(['/tutorial', TutorialArea.editAmazon]);
    // }

    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.thingId = +params.get('id');
        this.buildForm();
        this.getThing();
      }
    });
  }

  buildForm() {
    this.form = this.fb.group({
      linkUrl: '',
      linkTitleType: '',
      appId: ''
    });
  }

  getThing() {
    this.thingsController.readThing(this.thingId).subscribe(data => {
      this.thing = data;
    });
  }

  addLinkButton() {
    const viewModel = new Things.Api.Models.Button.ButtonModel;
    const button = new Things.Api.Models.Button.LinkButtonModel;
    button.linkTitleType = this.form.get('linkTitleType').value;
    button.linkUrl = this.form.get('linkUrl').value;
    viewModel.linkButtonModel = button;

    this.addButton(viewModel);
  }

  addAppButton() {
    const viewModel = new Things.Api.Models.Button.ButtonModel;
    const button = new Things.Api.Models.Button.AppButtonModel;
    button.appId = this.form.get('appId').value;
    viewModel.appButtonModel = button;

    this.addButton(viewModel);
  }

  addButton(viewModel: Things.Api.Models.Button.ButtonModel) {
    this.isProcessing = true;

    // TODO: thing could be null. Fix in all edit pages
    const rootPublicThingId = this.publicThingService.getRootThingIdFromThing(this.thing.parentHierarchy, this.thing.thing.id);
    if (rootPublicThingId === null) {
      this.thingsController.editThingButtons(this.thingId, viewModel).subscribe(data => {
        this.buttonType = null;
        this.isAddingButton = false;
        this.isProcessing = false;
      });
    } else {
      const token = this.publicThingService.getPublicThingValue(rootPublicThingId);
      if (token !== null) {
        this.thingsController.editPublicThingButtons(this.thingId, token, viewModel).subscribe(data => {
          this.buttonType = null;
          this.isAddingButton = false;
          this.isProcessing = false;
        });
      } else {
        const snackBarRef = this.snackBar.open('Unauthorized access!', 'Authorize', {
          duration: 6000
        });

        // Snack bar authorize
        snackBarRef.onAction().subscribe(() => {
          // The id from the public thing service could potentially not be a root public thing ID
          const link = ['/authorize', this.publicThingService.getRootThingIdFromThing(this.thing.parentHierarchy, this.thing.thing.id)];
          this.router.navigate(link);
        });
      }
    }
  }
}
