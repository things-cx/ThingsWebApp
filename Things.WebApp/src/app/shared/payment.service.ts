import { Injectable } from '@angular/core';
import { Things, PaymentController } from 'api-typings/bundle';
import { MdSnackBar } from '@angular/material';
import { environment } from 'environments/environment';

@Injectable()
export class PaymentService {

  // NB: needs to provide the payments controller in module this service is being used
  constructor(private paymentController: PaymentController,
    public snackBar: MdSnackBar) { }

  takePayment(productName: string, amount: number, token: any) {

    const viewModel = new Things.Api.ViewModels.Payment.PaymentRequestViewModel;
    viewModel.productName = productName;
    viewModel.amount = amount;
    viewModel.tokenId = token.id;

    this.paymentController.processPayment(viewModel).subscribe((data) => {
      if (data.status === 'succeeded') {
        // TODO: make this more rewarding for the user by showing full page and saying thank you!
        this.snackBar.open('Payment successful', '', {
          duration: 10000,
        });
      }
    }, error => {
      // TODO: crucial. handel payment error!
      this.snackBar.open('Payment error', '', {
        duration: 10000,
      });
    });
  }

  openCheckout(productName: string, amount: number, tokenCallback) {
    // TODO: using window any removes type checking
    const handler = (<any>window).StripeCheckout.configure({
      key: environment.stripePublishableKey,
      locale: 'auto',
      token: tokenCallback
    });

    // TODO: customize the amount being payed
    handler.open({
      name: 'Things',
      description: productName,
      zipCode: false,
      currency: 'gbp',
      amount: amount,
      panelLabel: 'Pay {{amount}}',
      allowRememberMe: false
    });
  }
}
