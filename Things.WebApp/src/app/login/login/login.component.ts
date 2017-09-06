import { Component, OnInit } from '@angular/core';
import { Things, UserController } from 'api-typings/bundle';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { FormService } from '../../shared/form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  formErrors;
  isProcessing = false;
  returnUrl = '/activity';

  constructor(private fb: FormBuilder,
    private userController: UserController,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private formService: FormService) {
  }

  ngOnInit() {
    if (this.authService.checkLogin()) {
      this.router.navigate(['/']);
    }

    this.buildForm();

    this.route.queryParamMap.subscribe(params => {
      if (params.has('returnUrl')) {
        this.returnUrl = params.get('returnUrl') || '/activity';
      }
    });
  }

  buildForm() {
    this.form = this.fb.group({
      emailOrUserThingName: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]]
    });
  }

  onSubmit() {
    this.isProcessing = true;

    const viewModel = new Things.Api.Models.User.LoginViewModel();
    if (this.form.get('emailOrUserThingName').value.indexOf('@') > -1) {
      viewModel.email = this.form.get('emailOrUserThingName').value;
    } else {
      viewModel.title = this.form.get('emailOrUserThingName').value;
    }
    viewModel.password = this.form.get('password').value;

    this.userController.login(viewModel).subscribe(
      data => {
        // TODO: this should actually happen in a service
        if (data.state === 1 && data.data && data.data['accessToken']) {
          this.authService.setToken(data.data['accessToken'], data.data['thingId']);
        }

        if (data.state === 1) {
          this.router.navigateByUrl(this.returnUrl);
        } else {
          alert(data.msg);
          this.isProcessing = false;
        }
      }, error => {
        this.isProcessing = false;
        this.formErrors = this.formService.showServerErrors(error);
      });
  }

  // SetUser(thing: Things.Api.Models.Thing) {
  //   localStorage.setItem(this.userAuthStorageKey, thing.id.toString());
  //   const link = ['/thing', thing.id];
  //   this.router.navigate(link);
  // }
}
