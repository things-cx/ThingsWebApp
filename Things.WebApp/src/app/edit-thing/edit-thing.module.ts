import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EditThingRoutingModule } from './edit-thing-routing.module';
import { MediaUploaderService } from '../shared/media-uploader.service';
import { TagsComponent } from './tags/tags.component';
import { DescriptionComponent } from './description/description.component';
import { MediaComponent } from './media/media.component';
import { AddTagsComponent } from '../edit-thing/add-tags/add-tags.component';
import { EditComponent } from './edit/edit.component';
import { GoogleCustomSearchService } from '../shared/google-custom-search.service';
import { MediaUploadComponent } from '../edit-thing/media-upload/media-upload.component';
import { GoogleCustomSearchComponent } from '../edit-thing/google-custom-search/google-custom-search.component';
import { DeleteComponent } from './delete/delete.component';
import { ThingModule } from '../thing/thing.module';
import { GifSearchComponent } from './gif-search/gif-search.component';
import { PreviewMediaDialogComponent } from './preview-media-dialog/preview-media-dialog.component';
import { EditorModule } from '../shared/editor/editor.module';
import { MediaTypeModule } from '../shared/media-type/media-type.module';
import { AmazonComponent } from './amazon/amazon.component';
import { AmazonController } from 'api-typings/bundle';
import { ButtonsComponent } from './buttons/buttons.component';
import { ThingButtonsModule } from '../shared/thing-buttons/thing-buttons.module';
import { OfficialPostersComponent } from './official-posters/official-posters.component';
import { SponsorsComponent } from './sponsors/sponsors.component';
import {
  MdButtonModule,
  MdInputModule,
  MdAutocompleteModule,
  MdProgressSpinnerModule,
  MdCardModule,
  MdIconModule,
  MdSnackBarModule,
  MdListModule,
  MdDialogModule,
  MdExpansionModule,
  MdRadioModule,
  MdSlideToggleModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    EditThingRoutingModule,
    ReactiveFormsModule,
    // TODO: Only using media importer. Move out and don't import create thing module. doesn't make sense
    MdButtonModule,
    MdInputModule,
    MdAutocompleteModule,
    MdProgressSpinnerModule,
    MdCardModule,
    MdIconModule,
    MdSnackBarModule,
    MdDialogModule,
    // TODO: not sure where to put this. Don't want to export out of module and navigation breaks when addind it to multiple modules
    ThingModule,
    EditorModule,
    MediaTypeModule,
    MdExpansionModule,
    MdRadioModule,
    ThingButtonsModule,
    MdSlideToggleModule
  ],
  declarations: [
    TagsComponent,
    DescriptionComponent,
    MediaComponent,
    MediaUploadComponent,
    GoogleCustomSearchComponent,
    AddTagsComponent,
    EditComponent,
    DeleteComponent,
    GifSearchComponent,
    PreviewMediaDialogComponent,
    AmazonComponent,
    ButtonsComponent,
    OfficialPostersComponent,
    SponsorsComponent
  ],
  providers: [
    MediaUploaderService,
    GoogleCustomSearchService,
    AmazonController
  ],
  exports: [
    MediaUploadComponent,
    GifSearchComponent
  ],
  entryComponents: [
    PreviewMediaDialogComponent
  ]
})
export class EditThingModule { }
