import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdCardModule, MdProgressSpinnerModule, MdIconModule } from '@angular/material';
import { MediaTypeModule } from 'app/shared/media-type/media-type.module';
import { OfficialPostersComponent } from 'app/official-posters/official-posters/official-posters.component';
import { OfficialPostersRoutingModule } from 'app/official-posters/official-posters-routing.module';

@NgModule({
  imports: [
    CommonModule,
    OfficialPostersRoutingModule,
    MdButtonModule,
    MdCardModule,
    MdProgressSpinnerModule,
    MdIconModule,
    MediaTypeModule
  ],
  declarations: [OfficialPostersComponent]
})
export class OfficialPostersModule { }
