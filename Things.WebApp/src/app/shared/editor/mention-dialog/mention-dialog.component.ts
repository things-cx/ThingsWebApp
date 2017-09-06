import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Things, ThingsController } from 'api-typings/bundle';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from '../../../shared/form.service';
import { MdDialogRef, MdAutocomplete, MdAutocompleteTrigger, MdInputDirective } from '@angular/material';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-mention',
  templateUrl: './mention-dialog.component.html',
  styleUrls: ['./mention-dialog.component.scss']
})
export class MentionDialogComponent implements OnInit {

  form: FormGroup;
  formErrors;
  searchResults: Things.Api.Models.Thing[];
  thingIdToSearchWithin: number;
  isSearching = false;
  selectedThings: Things.Api.Models.Thing[] = [];
  dialogClosed = false;

  @ViewChild(MdAutocompleteTrigger) trigger: MdAutocompleteTrigger;

  constructor(private router: Router,
    private fb: FormBuilder,
    private thingsController: ThingsController,
    private formService: FormService,
    public dialogRef: MdDialogRef<MentionDialogComponent>) { }

  ngOnInit() {
    this.buildForm();

    this.search('');
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
        if (!this.dialogClosed) {
          this.trigger.openPanel();
        }
      }, error => {
        this.isSearching = false;
        this.formErrors = this.formService.showServerErrors(error);
      });
  }

  $search(term: string) {
    this.isSearching = true;
    const viewModel = new Things.Api.ViewModels.Thing.SearchViewModel;
    viewModel.term = term || '';

    if (this.thingIdToSearchWithin !== null && this.thingIdToSearchWithin !== undefined && this.thingIdToSearchWithin !== 0) {
      return this.thingsController.searchThingStartWithForParent(this.thingIdToSearchWithin, viewModel);
    } else {
      return this.thingsController.searchUserStartWith(viewModel);
    }
  }

  search(term: string) {
    this.isSearching = true;
    const viewModel = new Things.Api.ViewModels.Thing.SearchViewModel;
    viewModel.term = term || '';

    if (this.thingIdToSearchWithin !== null && this.thingIdToSearchWithin !== undefined && this.thingIdToSearchWithin !== 0) {
      this.thingsController.searchThingStartWithForParent(this.thingIdToSearchWithin, viewModel).subscribe(
        data => {
          this.isSearching = false;
          this.searchResults = data;
        }, error => {
          this.isSearching = false;
          this.formErrors = this.formService.showServerErrors(error);
        });
    } else {
      this.thingsController.searchUserStartWith(viewModel).subscribe(
        data => {
          this.isSearching = false;
          this.searchResults = data;
        }, error => {
          this.isSearching = false;
          this.formErrors = this.formService.showServerErrors(error);
        });
    }
  }

  onSearchClick(thing: Things.Api.Models.Thing) {
    this.thingIdToSearchWithin = thing.id;

    this.selectedThings.push(thing);
  }

  removeUpUntilThisThing(thing: Things.Api.Models.Thing) {
    if (this.thingIdToSearchWithin !== thing.id) {
      this.thingIdToSearchWithin = thing.id;

      this.selectedThings = this.selectedThings.slice(0, this.selectedThings.indexOf(thing) + 1);

      this.search('');
    }
  }

  done() {
    let hierarchy = '';

    for (const selectedThing of this.selectedThings) {
      hierarchy += `@${selectedThing.title}`;
    }

    this.dialogClosed = true;
    this.trigger.closePanel();
    this.dialogRef.close(hierarchy);
  }
}
