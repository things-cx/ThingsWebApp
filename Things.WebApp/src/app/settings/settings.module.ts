import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PaymentsComponent } from './payments/payments.component';
import { WebhooksComponent } from './webhooks/webhooks.component';
import { SettingsRoutingModule } from 'app/settings/settings-routing.module';
import { MdButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MdButtonModule
  ],
  declarations: [SettingsComponent, NotificationsComponent, PaymentsComponent, WebhooksComponent]
})
export class SettingsModule { }
