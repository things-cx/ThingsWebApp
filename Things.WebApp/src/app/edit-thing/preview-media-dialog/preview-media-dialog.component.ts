import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-preview-media-dialog',
  templateUrl: './preview-media-dialog.component.html',
  styleUrls: ['./preview-media-dialog.component.scss']
})
export class PreviewMediaDialogComponent {

  url: string;

  constructor(public dialogRef: MdDialogRef<PreviewMediaDialogComponent>) { }

  onChoose() {
    this.dialogRef.close(true);
  }
}
