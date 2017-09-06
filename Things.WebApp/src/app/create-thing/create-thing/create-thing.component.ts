import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Things, ThingsController } from 'api-typings/bundle';
import { FormService } from '../../shared/form.service';
import { TutorialService, TutorialArea } from '../../tutorial/tutorial.service';
import { GaService } from '../../shared/ga.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-create-thing-form',
  templateUrl: './create-thing.component.html',
  styleUrls: ['./create-thing.component.scss']
})
export class CreateThingComponent implements OnInit {

  parentThingId: number;
  form: FormGroup;
  formErrors;
  isProcessing = false;
  isProcessingSearch = false;
  shortcutThings: Things.Api.Models.Thing[];
  isShortcutThing = false;

  constructor(private fb: FormBuilder,
    private thingsController: ThingsController,
    private route: ActivatedRoute,
    private router: Router,
    private formService: FormService,
    private tutorial: TutorialService,
    private gaService: GaService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.parentThingId = +params.get('id');
      }
    });

    this.route.queryParamMap.subscribe(params => {
      if (params.has('shortcut')) {
        this.isShortcutThing = params.get('shortcut') === 'true';

        if (!this.tutorial.hasDoneTutorial(TutorialArea.createShortcutThing) && this.isShortcutThing) {
          this.router.navigate(['/tutorial', TutorialArea.createShortcutThing]);
        }
      } else {
        this.isShortcutThing = false;
      }
    });

    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      title: ['', [
        Validators.required
      ]],
      searchShortcutThingTitle: '',
      shortcutThingId: null
    });

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
          this.isProcessingSearch = false;
          this.shortcutThings = data;
        }, error => {
          this.formErrors = this.formService.showServerErrors(error);
        });
    }
  }

  search(term: string) {
    this.isProcessingSearch = true;
    const viewModel = new Things.Api.ViewModels.Thing.SearchViewModel();
    viewModel.term = term;
    return this.thingsController.searchThingStartWith(viewModel);
  }

  onSubmit() {
    this.isProcessing = true;

    const viewModel = new Things.Api.ViewModels.Thing.CreateThingViewModel();
    viewModel.title = this.form.get('title').value;
    viewModel.parentThingId = this.parentThingId;

    if (this.isShortcutThing) {
      viewModel.shortcutThingId = this.form.get('shortcutThingId').value;
    }

    this.thingsController.createThing(viewModel).subscribe(
      data => {
        let link;
        if (this.isShortcutThing) {
          link = ['/thing', this.parentThingId];
        } else {
          // TODO: actually only need the thing id not all the data
          link = ['/edit', data.id];
        }

        this.router.navigate(link);
      }, error => {
        this.isProcessing = false;
        this.formErrors = this.formService.showServerErrors(error);
        // this.gaService.emitEvent('testCategory', 'testAction', 'testLabel', 10);
      });
  }
}
