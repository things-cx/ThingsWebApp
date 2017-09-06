import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Things, ThingsController } from 'api-typings/bundle';
import { FormService } from '../../shared/form.service';
import { AuthService } from '../../shared/auth.service';
import { TutorialService, TutorialArea } from '../../tutorial/tutorial.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-add-shortcut',
  templateUrl: './add-shortcut.component.html',
  styleUrls: ['./add-shortcut.component.scss']
})
export class AddShortcutComponent implements OnInit {

  shortcutThingId: number;
  form: FormGroup;
  formErrors;
  isProcessing = false;
  isSearching = false;
  searchResults: Things.Api.Models.Thing[];
  logedInUserId: number = this.authService.getLogedInUserId();

  constructor(private fb: FormBuilder,
    private thingsController: ThingsController,
    private route: ActivatedRoute,
    private router: Router,
    private formService: FormService,
    private authService: AuthService,
    private tutorial: TutorialService) {
  }

  ngOnInit() {
    if (!this.tutorial.hasDoneTutorial(TutorialArea.createShortcutThing)) {
      this.router.navigate(['/tutorial', TutorialArea.createShortcutThing]);
    }

    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.shortcutThingId = +params.get('id');
      }
    });

    this.authService.logedInUserId$.subscribe(id => {
      this.logedInUserId = id;
    });

    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      title: ['', [
        Validators.required
      ]],
      searchTerm: '',
      parentThingId: [null, [
        Validators.required
      ]],
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
    return this.thingsController.searchThingHierarchyForParent(this.logedInUserId, viewModel);
  }

  onSubmit() {
    this.isProcessing = true;

    const viewModel = new Things.Api.ViewModels.Thing.CreateThingViewModel();
    viewModel.title = this.form.get('title').value;
    viewModel.parentThingId = this.form.get('parentThingId').value;
    viewModel.shortcutThingId = this.shortcutThingId;

    this.thingsController.createThing(viewModel).subscribe(
      data => {
        const link = ['/thing', viewModel.parentThingId];
        this.router.navigate(link);
      }, error => {
        this.isProcessing = false;
        this.formErrors = this.formService.showServerErrors(error);
        // this.appInsightsService.trackException(errorRes);
      });
  }
}
