import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-share-post-dialog',
  templateUrl: './share-post-dialog.component.html',
  styleUrls: ['./share-post-dialog.component.scss']
})
export class SharePostDialogComponent {

  link: string;

  constructor(public snackBar: MdSnackBar) { }

  onLinkClick() {
    return false;
  }

  openSnackBar() {
    this.snackBar.open('Copied', '', {
      duration: 2000,
    });
  }
}
