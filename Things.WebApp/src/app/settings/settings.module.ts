import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PaymentsComponent } from './payments/payments.component';
import { WebhooksComponent } from './webhooks/webhooks.component';
import { SettingsRoutingModule } from '../settings/settings-routing.module';
import { MdButtonModule, MdCardModule, MdRadioModule } from '@angular/material';
import { LanguageComponent } from './language/language.component';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MdButtonModule,
    MdCardModule,
    MdRadioModule
  ],
  declarations: [SettingsComponent, NotificationsComponent, PaymentsComponent, WebhooksComponent, LanguageComponent]
})
export class SettingsModule { }
