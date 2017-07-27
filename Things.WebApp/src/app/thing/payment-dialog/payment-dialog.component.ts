import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})
export class PaymentDialogComponent {

  constructor(public dialogRef: MdDialogRef<PaymentDialogComponent>) { }

  continue(amount: string) {
    this.dialogRef.close(amount);
  }
}
