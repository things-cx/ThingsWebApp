import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Things, ThingsController } from 'api-typings/bundle';
import { PublicThingService } from '../../shared/public-thing.service';
import { FormService } from '../../shared/form.service';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.scss']
})
export class AuthorizeComponent implements OnInit {

  thingId: number;
  form: FormGroup;
  formErrors;
  isProcessing = false;
  returnUrl: string;

  constructor(private fb: FormBuilder,
    private thingsController: ThingsController,
    private route: ActivatedRoute,
    private router: Router,
    private publicThingService: PublicThingService,
    private formService: FormService) {
  }

  ngOnInit() {
    // This id has to be a root public thing ID
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.thingId = +params.get('id');
      }
    });

    this.buildForm();

    this.route.queryParamMap.subscribe(params => {
      if (params.has('returnUrl')) {
        this.returnUrl = params.get('returnUrl') || `/thing${this.thingId}`;
      }
    });
  }

  buildForm() {
    this.form = this.fb.group({
      password: ['', [
        Validators.required
      ]]
    });
  }

  onSubmit() {
    this.isProcessing = true;

    const viewModel = new Things.Api.ViewModels.Thing.ThingAuthTokenViewModel();
    viewModel.password = this.form.get('password').value;

    // TODO: thingId could be null. prevent form submit if so
    this.thingsController.getPublicThingAuthToken(this.thingId, viewModel).subscribe(data => {
      // TODO: actually only need the thing id not all the data

      this.publicThingService.addToken(this.thingId, data.token);

      this.router.navigateByUrl(this.returnUrl);
    }, error => {
      this.formErrors = this.formService.showServerErrors(error);

      this.isProcessing = false;
      // this.appInsightsService.trackException(error);
    });
  }
}
