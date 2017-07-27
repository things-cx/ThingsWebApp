import { Component, OnInit } from '@angular/core';
import { Things, ThingsController } from 'api-typings/bundle';
import { MdSnackBar, MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {

  isProcessing = false;

  constructor(private thingsController: ThingsController,
    private router: Router) { }

  send(content: string) {
    this.isProcessing = true;

    const viewModel = new Things.Api.ViewModels.Thing.FeedbackViewModel();
    viewModel.content = content;

    this.thingsController.sendFeedback(viewModel).subscribe(data => {
      this.router.navigate(['/']);
    },
      error => {
        this.isProcessing = false;
        // TODO: show errors
      });
  }
}
