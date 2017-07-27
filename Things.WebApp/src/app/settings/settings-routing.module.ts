import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navigation } from 'app/layout/navigation/navigation.component';
import { SettingsComponent } from 'app/settings/settings/settings.component';
import { NotificationsComponent } from 'app/settings/notifications/notifications.component';
import { PaymentsComponent } from 'app/settings/payments/payments.component';
import { WebhooksComponent } from 'app/settings/webhooks/webhooks.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'notifications', component: NotificationsComponent, data: { title: 'Notifications', nav: Navigation.Back } },
            { path: 'payments', component: PaymentsComponent, data: { title: 'Payments', nav: Navigation.Back } },
            { path: 'webhooks', component: WebhooksComponent, data: { title: 'Webhooks', nav: Navigation.Back } },
            { path: '', component: SettingsComponent, data: { title: 'Settings', nav: Navigation.Back } },
        ])
    ],
    exports: [RouterModule]
})
export class SettingsRoutingModule { }
