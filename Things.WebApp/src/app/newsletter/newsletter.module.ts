import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { MdButtonModule, MdCardModule, MdInputModule, MdProgressSpinnerModule } from '@angular/material';
import { NewsletterRoutingModule } from '../newsletter/newsletter-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NewsletterRoutingModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdProgressSpinnerModule
  ],
  declarations: [
    NewsletterComponent
  ]
})
export class NewsletterModule { }
