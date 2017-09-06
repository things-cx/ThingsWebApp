import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Things, ThingsController } from 'api-typings/bundle';
import { PublicThingService } from '../../shared/public-thing.service';
import { FormService } from '../../shared/form.service';
import { TutorialArea, TutorialService } from '../../tutorial/tutorial.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-create-public-thing',
  templateUrl: './create-public-thing.component.html',
  styleUrls: ['./create-public-thing.component.scss']
})
export class CreatePublicThingComponent implements OnInit {

  parentThingId: number = null;
  form: FormGroup;
  formErrors;
  isProcessing = false;
  isSearching = false;
  isCreatingPublicRootThing = false;
  shortcutThings: Things.Api.Models.Thing[];
  isShortcutThing = false;

  constructor(private fb: FormBuilder,
    private thingsController: ThingsController,
    private route: ActivatedRoute,
    private router: Router,
    private publicThingService: PublicThingService,
    private formService: FormService,
    private tutorial: TutorialService) { }

  ngOnInit() {
    if (!this.tutorial.hasDoneTutorial(TutorialArea.createPublicThing)) {
      this.router.navigate(['/tutorial', TutorialArea.createPublicThing]);
    }

    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.parentThingId = +params.get('id') || null;
      }
    });

    this.route.queryParamMap.subscribe(params => {
      if (params.has('shortcut')) {
        this.isShortcutThing = params.get('shortcut') === 'true';
      } else {
        this.isShortcutThing = false;
      }
    });

    if (this.parentThingId === 2 || this.parentThingId === null) {
      this.isCreatingPublicRootThing = true;
    }

    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      title: ['', [
        Validators.required
      ]],
      password: '',
      searchShortcutThingTitle: '',
      shortcutThingId: null
    });

    if (this.isCreatingPublicRootThing) {
      this.form.get('password').setValidators(Validators.required);
    }

    if (this.isShortcutThing) {
      this.form.get('shortcutThingId').setValidators(Validators.required);
    }

    if (this.isShortcutThing) {
      this.form.get('searchShortcutThingTitle').valueChanges
        .map(x => {
          if (x === '') {
            this.shortcutThings = null;
          }
          return x;
        })
        .debounceTime(1000)
        .filter(x => x !== '')
        .switchMap(value => this.search(value))
        .subscribe(
        data => {
          this.isSearching = false;
          this.shortcutThings = data;
        }, error => {
          this.formErrors = this.formService.showServerErrors(error);
        });
    }
  }

  search(term: string) {
    this.isSearching = true;
    const viewModel = new Things.Api.ViewModels.Thing.SearchViewModel();
    viewModel.term = term;
    return this.thingsController.searchThingStartWith(viewModel);
  }

  onSubmit() {
    this.isProcessing = true;

    const viewModel = new Things.Api.ViewModels.Thing.CreatePublicThingViewModel();
    viewModel.title = this.form.get('title').value;
    viewModel.password = this.form.get('password').value;

    if (this.parentThingId > 0) {
      viewModel.parentThingId = this.parentThingId;
    } else if (this.isCreatingPublicRootThing) {
      viewModel.parentThingId = 2;
    }

    if (this.route.snapshot.queryParamMap.has('rootId')) {
      viewModel.publicRootThingAuthToken = this.publicThingService.getPublicThingValue(+this.route.snapshot.queryParamMap.get('rootId'));
    }

    if (this.isShortcutThing) {
      viewModel.shortcutThingId = this.form.get('shortcutThingId').value;
    }

    this.thingsController.createPublicThing(viewModel).subscribe(
      data => {
        // TODO: actually only need the thing id not all the data

        if (this.isCreatingPublicRootThing) {
          this.getAuthToken(data.id);
        } else {
          let link;
          if (this.isShortcutThing) {
            link = ['/thing', this.parentThingId];
          } else {
            // TODO: actually only need the thing id not all the data
            link = ['/edit', data.id];
          }

          this.router.navigate(link);
        }
      }, error => {
        this.isProcessing = false;

        this.formErrors = this.formService.showServerErrors(error);
        // this.appInsightsService.trackException(errorRes);
      });
  }

  getAuthToken(id) {
    const viewModel = new Things.Api.ViewModels.Thing.ThingAuthTokenViewModel();
    viewModel.password = this.form.get('password').value;

    this.thingsController.getPublicThingAuthToken(id, viewModel).subscribe(
      data => {
        this.publicThingService.addToken(id, data.token);

        const link = ['/edit', id];
        this.router.navigate(link);
      }, error => {
        this.formErrors = this.formService.showServerErrors(error);

        this.isProcessing = false;
        // this.appInsightsService.trackException(errorRes);
      });
  }
}
