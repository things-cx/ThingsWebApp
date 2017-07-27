import { Component, Input } from '@angular/core';
import { MdSnackBar, MdDialog } from '@angular/material';

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.scss']
})
export class ShareDialogComponent {

  @Input() link: string;

  constructor(public snackBar: MdSnackBar,
    public dialog: MdDialog) { }

  onLinkClick() {
    return false;
  }

  openSnackBar() {
    this.dialog.closeAll();
    this.snackBar.open('Copied', '', {
      duration: 2000,
    });
  }
}
