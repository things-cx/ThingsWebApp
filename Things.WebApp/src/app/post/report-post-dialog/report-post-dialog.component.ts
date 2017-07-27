import { Component, OnInit, Input } from '@angular/core';
import { MdSnackBar, MdDialog } from '@angular/material';
import { PostController, Things } from 'api-typings/bundle';

@Component({
  selector: 'app-report-post-dialog',
  templateUrl: './report-post-dialog.component.html',
  styleUrls: ['./report-post-dialog.component.scss']
})
export class ReportPostDialogComponent implements OnInit {

  @Input() postUId: string;

  constructor(public snackBar: MdSnackBar,
    public dialog: MdDialog,
    private postController: PostController) { }

  ngOnInit() {
  }

  report() {
    this.dialog.closeAll();

    const viewModel = new Things.Api.ViewModels.Post.ReportPostViewModel;
    viewModel.postUId = this.postUId;

    this.snackBar.open('Sending', '', {
      duration: 10000,
    });

    this.postController.reportPost(viewModel).subscribe(data => {
      this.snackBar.dismiss();

      this.snackBar.open('Sent', '', {
        duration: 2000,
      });
    });
  }
}
