import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Things, ThingsController } from 'api-typings/bundle';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormService } from '../../shared/form.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-search-underneath',
  templateUrl: './search-underneath.component.html',
  styleUrls: ['./search-underneath.component.scss']
})
export class SearchUnderneathComponent implements OnInit {

  form: FormGroup;
  formErrors;
  searchResults: Things.Api.Models.Thing[];
  @Input() thingId: number;
  isSearching = false;

  constructor(private router: Router,
    private fb: FormBuilder,
    private thingsController: ThingsController,
    private formService: FormService) { }

  ngOnInit() {
    this.buildForm();
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
    return this.thingsController.searchThingHierarchyForParent(this.thingId, viewModel);
  }

  // TODO: add keyboard enter interaction
  onSearchClick(thingId: number) {
    this.form.get('searchTerm').setValue('');
    const link = ['/thing', thingId];
    this.router.navigate(link);
  }
}
