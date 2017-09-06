import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { ThingsController, Things } from 'api-typings/bundle';
import { TutorialService, TutorialArea } from '../../tutorial/tutorial.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormService } from '../../shared/form.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-add-tags',
  templateUrl: './add-tags.component.html',
  styleUrls: ['./add-tags.component.scss']
})
export class AddTagsComponent implements OnInit {

  form: FormGroup;
  formErrors;
  @Input() tags: string[];
  originalTags;
  tagSearchResults: Things.Api.ViewModels.Thing.TagsSearchResultViewModel[];
  @Output() onSave: EventEmitter<string[]> = new EventEmitter();

  // TODO: add filter to autocomplete to handle start with typings

  constructor(private thingsController: ThingsController,
    private router: Router,
    private fb: FormBuilder,
    private formService: FormService) { }

  ngOnInit() {
    this.originalTags = this.tags;

    if (this.tags == null) {
      this.tags = [];
    }

    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      tags: ['']
    });

    this.form.get('tags').valueChanges
      .map(x => {
        if (x === '') {
          this.tagSearchResults = null;
        }
        return x;
      })
      .debounceTime(1000)
      .filter(x => x !== '')
      .switchMap(value => this.search(value))
      .subscribe(data => {
        this.tagSearchResults = data;
      }, error => {
        this.formErrors = this.formService.showServerErrors(error);
      });
  }

  onBackspace(event: KeyboardEvent) {
    if ((<HTMLInputElement>event.target).value === '') {
      this.tags.pop();
    }
  }

  addTag() {
    // TODO: show message if tag already exists
    if (this.form.get('tags').value !== '' && this.tags.indexOf(this.form.get('tags').value) === -1) {
      this.tags.push(this.form.get('tags').value);

      // Reset
      this.tagSearchResults = null;
      this.form.get('tags').setValue('');
    }
  }

  removeTag(tag: string) {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  onSearchResultOnSelect(tag: string) {
    this.form.get('tags').setValue(tag);
    this.addTag();
  }

  search(term: string) {
    const viewModel = new Things.Api.ViewModels.Thing.SearchViewModel;
    viewModel.term = term;
    return this.thingsController.searchTags(viewModel);
  }

  save() {
    this.onSave.emit(this.tags);
  }
}
