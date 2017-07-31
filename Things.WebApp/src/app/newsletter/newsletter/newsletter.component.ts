import { Component, OnInit } from '@angular/core';
import { Things, ThingsController, UserController } from 'api-typings/bundle';
import { MdSnackBar, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {

  isProcessing = false;
  removingEmail = false;
  message = false;

  constructor(private userController: UserController,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      if (params.has('removeEmail')) {
        this.removingEmail = params.get('removeEmail') === 'true';
      } else {
        this.removingEmail = false;
      }
    });
  }

  add(email: string) {
    this.isProcessing = true;

    const viewModel = new Things.Api.ViewModels.User.NewsletterMemberViewModel();
    viewModel.email = email;

    this.userController.createNewsletterMember(viewModel).subscribe(data => {
      this.isProcessing = false;
      this.message = true;
    });
  }

  remove(email: string) {
    this.isProcessing = true;

    const viewModel = new Things.Api.ViewModels.User.NewsletterMemberViewModel();
    viewModel.email = email;

    this.userController.deleteNewsletterMember(viewModel).subscribe(data => {
      this.isProcessing = false;
      this.message = true;
    });
  }
}
