import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent {

  name = '';
  url = '';

  constructor(public dialogRef: MdDialogRef<LinkComponent>) { }

  save(name: string, url: string) {
    if (name !== null && name !== undefined && url !== null && url !== undefined) {
      this.dialogRef.close({ name: name, url: url });
    }
  }
}
