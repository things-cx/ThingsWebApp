import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { DiscoverComponent } from './discover/discover.component';
import { SearchComponent } from './search/search.component';
import { SearchRoutingModule } from './search-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MediaTypeModule } from 'app/shared/media-type/media-type.module';
import {
  MdInputModule,
  MdChipsModule,
  MdListModule,
  MdCardModule,
  MdProgressSpinnerModule,
  MdIconModule
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
    MediaTypeModule
  ],
  declarations: [
    SearchBarComponent,
    DiscoverComponent,
    SearchComponent
  ]
})
export class SearchModule { }
