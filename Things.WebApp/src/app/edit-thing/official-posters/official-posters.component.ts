import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Things, ThingsController } from 'api-typings/bundle';
import { PublicThingService } from '../../shared/public-thing.service';
import { FormService } from '../../shared/form.service';

@Component({
  selector: 'app-official-posters',
  templateUrl: './official-posters.component.html',
  styleUrls: ['./official-posters.component.scss']
})
export class OfficialPostersComponent implements OnInit {

  officialPosters: Things.Api.ViewModels.Thing.GetThingOfficialPostersViewModel[];
  searchResults: Things.Api.Models.Thing[];
  selectedUser: Things.Api.Models.Thing;
  form: FormGroup;
  formErrors;
  thingId: number;
  isProcessing = true;
  isSearching = false;
  skip = 0;
  isAddingOfficialPoster = false;

  constructor(private thingsController: ThingsController,
    private route: ActivatedRoute,
    private router: Router,
    private publicThingService: PublicThingService,
    public snackBar: MdSnackBar,
    private fb: FormBuilder,
    private formService: FormService) { }

  ngOnInit() {
    this.buildForm();

    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.thingId = +params.get('id');
        this.officialPosters = [];
        this.skip = 0;
        this.getOfficialPosters();
      }
    });
  }


  buildForm() {
    this.form = this.fb.group({
      searchTerm: ['']
    });

    this.form.get('searchTerm').valueChanges
      .map(x => {
        if (x === '') {
          // this.searchResults = null;
        }
        return x;
      })
      .debounceTime(1000)
      .filter(x => x !== '')
      .switchMap(value => this.$search(value))
      .subscribe(
      data => {
        this.isSearching = false;
        this.searchResults = data;
      }, error => {
        this.isSearching = false;
        this.formErrors = this.formService.showServerErrors(error);
      });
  }

  getOfficialPosters() {
    this.isProcessing = true;

    const viewModel = new Things.Api.ViewModels.Thing.GetThingFollowersViewModel;
    viewModel.skip = this.skip;

    this.thingsController.getOfficialPosters(this.thingId, viewModel).subscribe(
      data => {
        this.officialPosters = data;
        this.isProcessing = false;
      });
  }

  loadMore() {
    this.isProcessing = true;

    this.skip += 10;
    const viewModel = new Things.Api.ViewModels.Thing.GetThingFollowersViewModel;
    viewModel.skip = this.skip;

    this.thingsController.getOfficialPosters(this.thingId, viewModel).subscribe(
      data => {
        this.officialPosters.concat(data);
        this.isProcessing = false;
      });
  }

  $search(term: string) {
    this.isSearching = true;
    const viewModel = new Things.Api.ViewModels.Thing.SearchViewModel;
    viewModel.term = term || '';

    return this.thingsController.searchUserStartWith(viewModel);
  }

  searchResultClick(thing: Things.Api.Models.Thing) {
    this.selectedUser = thing;
  }

  add() {
    if (this.selectedUser) {
      const viewModel = new Things.Api.ViewModels.Thing.Edit.EditThingOfficialPosterViewModel;
      viewModel.userId = this.selectedUser.id;

      this.editOfficialPoster(viewModel);
      this.selectedUser = null;
    }
  }

  remove(userId: number) {
    const response = confirm('Are you sure?');
    if (response === true) {
      const viewModel = new Things.Api.ViewModels.Thing.Edit.EditThingOfficialPosterViewModel;
      viewModel.userId = userId;
      viewModel.shouldDelete = true;

      this.editOfficialPoster(viewModel);
    }
  }

  editOfficialPoster(viewModel: Things.Api.ViewModels.Thing.Edit.EditThingOfficialPosterViewModel) {
    this.isProcessing = true;

    // TODO: thing could be null. Fix in all edit pages

    this.thingsController.getRootThingIdFromThing(this.thingId).subscribe(rootPublicThingId => {
      if (rootPublicThingId === null) {
        this.thingsController.editThingOfficialPoster(this.thingId, viewModel).subscribe(data => {
          this.isAddingOfficialPoster = false;
          this.officialPosters = [];
          this.skip = 0;
          this.getOfficialPosters();
        });
      } else {
        const token = this.publicThingService.getPublicThingValue(rootPublicThingId);
        if (token !== null) {
          this.thingsController.editPublicThingOfficialPoster(this.thingId, token, viewModel).subscribe(data => {
            this.isAddingOfficialPoster = false;
            this.officialPosters = [];
            this.skip = 0;
            this.getOfficialPosters();
          });
        } else {
          const snackBarRef = this.snackBar.open('Unauthorized access!', 'Authorize', {
            duration: 6000
          });

          // Snack bar authorize
          snackBarRef.onAction().subscribe(() => {
            // The id from the public thing service could potentially not be a root public thing ID
            const link = ['/authorize', rootPublicThingId];
            this.router.navigate(link, { queryParams: { returnUrl: this.router.url } });
          });
        }
      }
    });
  }
}
