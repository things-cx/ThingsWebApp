import { Component, Input } from '@angular/core';
import { MdDialog } from '@angular/material';
import { ShareDialogComponent } from '../share-dialog/share-dialog.component';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-share-options-dialog',
  templateUrl: './share-options-dialog.component.html',
  styleUrls: ['./share-options-dialog.component.scss']
})
export class ShareOptionsDialogComponent {

  @Input() thingId: number;
  @Input() thingTitle: string;
  @Input() logedInUserId: number;

  constructor(private dialog: MdDialog,
    private router: Router) { }

  openCreatePost() {
    this.dialog.closeAll();
    this.router.navigate(['/create-post'], { queryParams: { ref: `@${this.thingTitle}` } });
  }

  openShareDialog() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(ShareDialogComponent);
    const link = ['/thing', this.thingId];
    dialogRef.componentInstance.link = environment.hostUrlForSharingToWeb + this.router.createUrlTree(link).toString();
  }
}
