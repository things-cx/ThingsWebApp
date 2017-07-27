import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RequestResetComponent } from 'app/forgot-password/request-reset/request-reset.component';
import { ChangePasswordComponent } from 'app/forgot-password/change-password/change-password.component';
import { ViewEmailComponent } from 'app/forgot-password/view-email/view-email.component';
import { Navigation } from 'app/layout/navigation/navigation.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: RequestResetComponent, data: { title: 'Request forgotten password', nav: Navigation.Primary } },
            { path: 'sent', component: ViewEmailComponent, data: { title: 'Request sent', nav: Navigation.Primary } },
            { path: ':code', component: ChangePasswordComponent, data: { title: 'Change password', nav: Navigation.Back } }
        ])
    ],
    exports: [RouterModule]
})
export class ForgotPasswordRoutingModule { }
