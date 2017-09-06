import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Things, UserController } from 'api-typings/bundle';
import { AuthService } from '../../shared/auth.service';
import { FormService } from '../../shared/form.service';

@Component({
  selector: 'app-create-thing-form',
  templateUrl: './create-user-thing-form.component.html',
  styleUrls: ['./create-user-thing-form.component.scss']
})
export class CreateUserThingFormComponent implements OnInit {

  form: FormGroup;
  formErrors;
  isProcessing = false;

  constructor(private fb: FormBuilder,
    private userController: UserController,
    private router: Router,
    private authService: AuthService,
    private formService: FormService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      email: ['', [
        Validators.required
      ]],
      title: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]]
    });
  }

  onSubmit() {
    this.isProcessing = true;

    const viewModel = new Things.Api.ViewModels.User.CreateUserThingViewModel();
    viewModel.title = this.form.get('title').value;
    viewModel.email = this.form.get('email').value;
    viewModel.password = this.form.get('password').value;

    this.userController.createUserThing(viewModel).subscribe(
      data => {
        this.setUserToken();
      }, error => {
        this.isProcessing = false;
        this.formErrors = this.formService.showServerErrors(error);
      });
  }

  setUserToken() {
    const model = new Things.Api.Models.User.LoginViewModel();
    model.title = this.form.get('title').value;
    model.password = this.form.get('password').value;

    this.userController.login(model).subscribe(
      data => {
        // TODO: this should actually happen in a service
        if (data.state === 1 && data.data && data.data['accessToken']) {
          this.authService.setToken(data.data['accessToken'], data.data['thingId']);
        }

        if (data.state === 1) {
          const link = ['/edit', data.data['thingId']];
          this.router.navigate(link, { queryParams: { signup: true } });
        } else {
          alert(data.msg);
        }
      }, error => {
        this.isProcessing = false;
        this.formErrors = this.formService.showServerErrors(error);
      });
  }
}
