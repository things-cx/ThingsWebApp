import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserController, Things } from 'api-typings/bundle';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormService } from '../../shared/form.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  form: FormGroup;
  formErrors;
  code: string;
  isProcessing = false;

  constructor(private route: ActivatedRoute,
    private userController: UserController,
    private fb: FormBuilder,
    private router: Router,
    private formService: FormService) { }

  ngOnInit() {
    this.buildForm();

    this.route.paramMap.subscribe(params => {
      if (params.has('code')) {
        this.code = params.get('code');
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

    const viewModel = new Things.Api.ViewModels.User.ChangeForgottenPasswordViewModel;
    viewModel.code = this.code;
    viewModel.password = this.form.get('password').value;
    this.userController.changeForgottenPassword(viewModel).subscribe(
      data => {
        const link = ['/login'];
        this.router.navigate(link);
      }, error => {
        this.isProcessing = false;
        this.formErrors = this.formService.showServerErrors(error);
      });
  }
}
