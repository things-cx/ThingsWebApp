import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdCardModule, MdProgressSpinnerModule, MdIconModule } from '@angular/material';
import { AvailableSponsorsComponent } from './available-sponsors/available-sponsors.component';
import { SponsorsRoutingModule } from '../sponsors/sponsors-routing.module';
import { MediaTypeModule } from '../shared/media-type/media-type.module';

@NgModule({
  imports: [
    CommonModule,
    SponsorsRoutingModule,
    MdButtonModule,
    MdCardModule,
    MdProgressSpinnerModule,
    MdIconModule,
    MediaTypeModule
  ],
  declarations: [AvailableSponsorsComponent]
})
export class SponsorsModule { }
