import { Component, OnInit, Input } from '@angular/core';
import { MdSnackBar, MdDialog } from '@angular/material';
import { ThingsController, Things } from 'api-typings/bundle';

@Component({
  selector: 'app-report',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.scss']
})
export class ReportDialogComponent implements OnInit {

  @Input() thingId: number;

  constructor(public snackBar: MdSnackBar,
    public dialog: MdDialog,
    private thingsController: ThingsController) { }

  ngOnInit() {
  }

  report() {
    this.dialog.closeAll();

    const viewModel = new Things.Api.ViewModels.Thing.ReportThingViewModel;
    viewModel.thingId = this.thingId;

    this.snackBar.open('Sending', '', {
      duration: 10000,
    });

    this.thingsController.reportThing(viewModel).subscribe(data => {
      this.snackBar.dismiss();

      this.snackBar.open('Sent', '', {
        duration: 2000,
      });
    });
  }
}
