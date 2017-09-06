import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdCardModule, MdProgressSpinnerModule, MdIconModule, MdTooltipModule } from '@angular/material';
import { MediaTypeModule } from '../shared/media-type/media-type.module';
import { OfficialPostersComponent } from '../official-posters/official-posters/official-posters.component';
import { OfficialPostersRoutingModule } from '../official-posters/official-posters-routing.module';

@NgModule({
  imports: [
    CommonModule,
    OfficialPostersRoutingModule,
    MdButtonModule,
    MdCardModule,
    MdProgressSpinnerModule,
    MdIconModule,
    MediaTypeModule,
    MdTooltipModule
  ],
  declarations: [OfficialPostersComponent]
})
export class OfficialPostersModule { }
