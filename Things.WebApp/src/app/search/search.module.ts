import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { DiscoverComponent } from './discover/discover.component';
import { SearchComponent } from './search/search.component';
import { SearchRoutingModule } from './search-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MdInputModule, MdChipsModule, MdListModule, MdCardModule, MdProgressSpinnerModule } from '@angular/material';
import { MediaTypeModule } from 'app/shared/media-type/media-type.module';

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
    MediaTypeModule
  ],
  declarations: [
    SearchBarComponent,
    DiscoverComponent,
    SearchComponent
  ]
})
export class SearchModule { }
