import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ThingsController, Things } from 'api-typings/bundle';
import { FormService } from '../../shared/form.service';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss']
})
export class SponsorsComponent implements OnInit {

  sponsors: Things.Api.ViewModels.Thing.Sponsors.GetThingSponsorsViewModel[];
  form: FormGroup;
  formErrors;
  thingId: number;
  isProcessing = true;
  skip = 0;

  constructor(private thingsController: ThingsController,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private formService: FormService) { }

  ngOnInit() {
    this.buildForm();

    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.thingId = +params.get('id');
        this.sponsors = [];
        this.skip = 0;
        this.getSponsors();
      }
    });
  }

  buildForm() {
    this.form = this.fb.group({
      activateSponsor: ''
    });

    this.form.get('activateSponsor').valueChanges.subscribe(
      value => {
        // CONTINUE!!!!!!!TODO: cater for when user denies operation
        const response = confirm('This will allow other people to sponsor/pay for your Thing and place their name on it.');
        if (response === true) {
          this.thingsController.editThingSponsor(this.thingId, value).subscribe(
            data => {
              this.isProcessing = false;
            });
        }
      }, error => {
        this.formErrors = this.formService.showServerErrors(error);
      });
  }

  getSponsors() {
    this.isProcessing = true;

    const viewModel = new Things.Api.ViewModels.Thing.GetThingFollowersViewModel;
    viewModel.skip = this.skip;

    this.thingsController.getThingSponsors(this.thingId, viewModel).subscribe(
      data => {
        this.sponsors = data;
        this.isProcessing = false;

        if (this.sponsors !== null && this.sponsors.length > 0) {
          this.form.get('activateSponsor').setValue(this.sponsors[0].isSponsor);
        }
      });
  }

  loadMore() {
    this.isProcessing = true;

    this.skip += 10;
    const viewModel = new Things.Api.ViewModels.Thing.GetThingFollowersViewModel;
    viewModel.skip = this.skip;

    this.thingsController.getThingSponsors(this.thingId, viewModel).subscribe(
      data => {
        this.sponsors.concat(data);
        this.isProcessing = false;
      });
  }

  setSponsor(userId: number) {
    this.isProcessing = true;

    const response = confirm('Are you sure? This cant be undone!');
    if (response === true) {
      this.thingsController.createThingSponsor(this.thingId, userId).subscribe(
        data => {
          this.isProcessing = false;
        });
    }
  }
}
