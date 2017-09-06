import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserController, Things } from 'api-typings/bundle';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from '../../shared/form.service';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.scss']
})
export class RequestResetComponent implements OnInit {

  form: FormGroup;
  formErrors;
  isProcessing = false;

  constructor(private fb: FormBuilder,
    private userController: UserController,
    private route: ActivatedRoute,
    private router: Router,
    private formService: FormService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      email: ['', [
        Validators.required
      ]]
    });
  }

  onSubmit() {
    this.isProcessing = true;

    const viewModel = new Things.Api.ViewModels.User.ForgotPasswordViewModel();
    viewModel.email = this.form.get('email').value;

    this.userController.forgotPassword(viewModel).subscribe(
      data => {
        this.router.navigate(['/forgot-password/sent'], { queryParams: { email: viewModel.email } });
      }, error => {
        this.isProcessing = false;
        this.formErrors = this.formService.showServerErrors(error);
      });
  }
}
