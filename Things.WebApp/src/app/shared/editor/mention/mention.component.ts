import { Component, OnInit, Input } from '@angular/core';
import { Things, ThingsController } from 'api-typings/bundle';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from 'app/shared/form.service';
import { MdDialogRef } from '@angular/material';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-mention',
  templateUrl: './mention.component.html',
  styleUrls: ['./mention.component.scss']
})
export class MentionComponent implements OnInit {

  form: FormGroup;
  formErrors;
  searchResults: Things.Api.Models.Thing[];
  thingIdToSearchWithin: number;
  isSearching = false;
  selectedThings: Things.Api.Models.Thing[] = [];

  constructor(private router: Router,
    private fb: FormBuilder,
    private thingsController: ThingsController,
    private formService: FormService,
    public dialogRef: MdDialogRef<MentionComponent>) { }

  ngOnInit() {
    this.buildForm();

    // this.search('');
  }

  buildForm() {
    this.form = this.fb.group({
      searchTerm: ['']
    });

    this.form.get('searchTerm').valueChanges
      .map(x => {
        if (x === '') {
          this.searchResults = null;
        }
        return x;
      })
      .debounceTime(1000)
      .filter(x => x !== '')
      .switchMap(value => this.search(value))
      .subscribe(
      data => {
        this.isSearching = false;
        this.searchResults = data;
      }, error => {
        this.isSearching = false;
        this.formErrors = this.formService.showServerErrors(error);
      });
  }

  search(term: string) {
    this.isSearching = true;
    const viewModel = new Things.Api.ViewModels.Thing.SearchViewModel;
    viewModel.term = term;

    if (this.thingIdToSearchWithin !== null && this.thingIdToSearchWithin !== undefined && this.thingIdToSearchWithin !== 0) {
      return this.thingsController.searchThingStartWithForParent(this.thingIdToSearchWithin, viewModel);
    } else {
      return this.thingsController.searchUserStartWith(viewModel);
    }
  }

  onSearchClick(thing: Things.Api.Models.Thing) {
    this.thingIdToSearchWithin = thing.id;

    this.selectedThings.push(thing);

    this.search('');
  }

  goToSelectedThing(thing: Things.Api.Models.Thing) {
    if (this.thingIdToSearchWithin !== thing.id) {
      this.thingIdToSearchWithin = thing.id;

      this.selectedThings = this.selectedThings.slice(0, this.selectedThings.indexOf(thing) + 1);

      this.search('');
    }
  }

  done() {
    const mention = new Mention();
    let hierarchy = '';

    for (const selectedThing of this.selectedThings) {
      mention.title = selectedThing.title;
      mention.thingId = selectedThing.id;

      hierarchy += `@${selectedThing.title}`;
    }
    mention.hierarchy = hierarchy;

    this.dialogRef.close(mention);
  }
}

export class Mention {
  title: string;
  hierarchy: string;
  thingId: number;
  indicies: string[];
}