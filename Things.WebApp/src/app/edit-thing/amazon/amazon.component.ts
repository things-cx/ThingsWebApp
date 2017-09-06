import { Component, OnInit, Input } from '@angular/core';
import { Things, ThingsController, AmazonController, AmazonProductAdvertising } from 'api-typings/bundle';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicThingService } from '../../shared/public-thing.service';
import { MdSnackBar } from '@angular/material';
import { TutorialService, TutorialArea } from '../../tutorial/tutorial.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormService } from '../../shared/form.service';

@Component({
  selector: 'app-amazon',
  templateUrl: './amazon.component.html',
  styleUrls: ['./amazon.component.scss']
})
export class AmazonComponent implements OnInit {

  thing: Things.Api.Models.ThingModel;
  thingId: number;
  isSearching = true;
  searchResults: AmazonProductAdvertising.Api.Model.AmazonItemResponse;
  form: FormGroup;
  formErrors;
  currentItem: AmazonProductAdvertising.Api.Model.Item;
  isGettingCurrentProduct = false;

  constructor(private thingsController: ThingsController,
    private amazonController: AmazonController,
    private route: ActivatedRoute,
    private tutorial: TutorialService,
    private router: Router,
    private fb: FormBuilder,
    private formService: FormService,
    private publicThingService: PublicThingService,
    public snackBar: MdSnackBar) { }

  ngOnInit() {
    if (!this.tutorial.hasDoneTutorial(TutorialArea.editAmazon)) {
      this.router.navigate(['/tutorial', TutorialArea.editAmazon]);
    }

    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.thingId = +params.get('id');
        this.buildForm();
        this.getThing();
      }
    });
  }

  getThing() {
    this.thingsController.readThing(this.thingId).subscribe(data => {
      this.thing = data;

      // if (this.thing.thing.amazonProductId != null) {
      //   this.getCurrentAmazonProduct();
      // }

      // Initial search with Thing title
      this.form.get('searchTerm').setValue(this.thing.thing.title);
      this.search();
    });
  }

  buildForm() {
    this.form = this.fb.group({
      searchTerm: [''],
      lookupTerm: ['']
    });
  }

  getCurrentAmazonProduct() {
    this.isGettingCurrentProduct = true;

    const viewModel = new Things.Api.ViewModels.Amazon.AmazonSearchViewModel;
    // viewModel.term = this.thing.thing.amazonProductId;
    this.amazonController.itemLookup(viewModel).subscribe(
      data => {
        this.isGettingCurrentProduct = false;
        if (data != null && data.items != null && data.items.item != null && data.items.item.length > 0) {
          this.currentItem = data.items.item[0];
        }
      }, error => {
        this.isGettingCurrentProduct = false;
        this.formErrors = this.formService.showServerErrors(error);
      });
  }

  search() {
    this.isSearching = true;
    // TODO: exclude tags that are already chosen/inserted
    const viewModel = new Things.Api.ViewModels.Amazon.AmazonSearchViewModel;
    viewModel.term = this.form.get('searchTerm').value;
    if (viewModel.term !== null) {
      this.amazonController.itemSearch(viewModel).subscribe(
        data => {
          this.isSearching = false;
          this.searchResults = data;
        }, error => {
          this.isSearching = false;
          this.formErrors = this.formService.showServerErrors(error);
        });
    }
  }

  lookup() {
    this.isSearching = true;
    // TODO: exclude tags that are already chosen/inserted
    const viewModel = new Things.Api.ViewModels.Amazon.AmazonSearchViewModel;
    viewModel.term = this.form.get('lookupTerm').value;
    if (viewModel.term !== '') {
      this.amazonController.itemSearch(viewModel).subscribe(
        data => {
          this.isSearching = false;
          this.searchResults = data;
        }, error => {
          this.isSearching = false;
          this.formErrors = this.formService.showServerErrors(error);
        });
    }
  }

  onChoose(item: AmazonProductAdvertising.Api.Model.Item) {
    const viewModel = new Things.Api.ViewModels.Thing.Edit.EditThingButtonsViewModel;
    const button = new Things.Api.Models.Button.AmazonButtonModel;
    button.amazonProductId = item.asin;
    viewModel.amazonButtonModel = button;

    // TODO: thing could be null. Fix in all edit pages
    const rootPublicThingId = this.publicThingService.getRootThingIdFromThing(this.thing.parentHierarchy, this.thing.thing.id);
    if (rootPublicThingId === null) {
      this.thingsController.editThingButtons(this.thingId, viewModel).subscribe(data => {
        const link = ['edit/buttons', this.thingId];
        this.router.navigate(link);
      });
    } else {
      const token = this.publicThingService.getPublicThingValue(rootPublicThingId);
      if (token !== null) {
        this.thingsController.editPublicThingButtons(this.thingId, token, viewModel).subscribe(data => {
          const link = ['edit/buttons', this.thingId];
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
