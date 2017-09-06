import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { DiscoverComponent } from './discover/discover.component';
import { SearchRoutingModule } from './search-routing.module';
import { MediaTypeModule } from '../shared/media-type/media-type.module';
import {
  MdInputModule,
  MdChipsModule,
  MdListModule,
  MdCardModule,
  MdProgressSpinnerModule,
  MdIconModule,
  MdButtonModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule,
    ReactiveFormsModule,
    MdInputModule,
    MdChipsModule,
    MdListModule,
    MdCardModule,
    MdProgressSpinnerModule,
    MdIconModule,
    MdButtonModule,
    MediaTypeModule
  ],
  declarations: [
    SearchBarComponent,
    DiscoverComponent
  ]
})
export class SearchModule { }
