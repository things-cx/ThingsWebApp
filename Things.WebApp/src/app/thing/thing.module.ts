import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from 'ngx-clipboard';
import { ReactiveFormsModule } from '@angular/forms';
import { ThingDetailsComponent } from './thing-details/thing-details.component';
import { ThingChildrenComponent } from './thing-children/thing-children.component';
import { ThingRoutingModule } from './thing-routing.module';
import { ThingRelatedComponent } from './thing-related/thing-related.component';
import { ShareDialogComponent } from './share-dialog/share-dialog.component';
import { SearchUnderneathComponent } from './search-underneath/search-underneath.component';
import { ReportDialogComponent } from './report-dialog/report-dialog.component';
import { ThingPostsComponent } from './thing-posts/thing-posts.component';
import { ThingMediaComponent } from './thing-media/thing-media.component';
import { ThingMediaItemsComponent } from './thing-media-items/thing-media-items.component';
import { ThingPostsItemsComponent } from './thing-posts-items/thing-posts-items.component';
import { DescriptionComponent } from './description/description.component';
import { NoContentPostsDialogComponent } from './no-content-posts-dialog/no-content-posts-dialog.component';
import { NoContentRelatedDialogComponent } from './no-content-related-dialog/no-content-related-dialog.component';
import { NoContentUnderneathDialogComponent } from './no-content-underneath-dialog/no-content-underneath-dialog.component';
import { NoContentMediaDialogComponent } from './no-content-media-dialog/no-content-media-dialog.component';
import { PaymentController } from 'api-typings/bundle';
import { MediaViewerComponent } from './media-viewer/media-viewer.component';
import { PaymentDialogComponent } from './payment-dialog/payment-dialog.component';
import { RootPublicThingDialogComponent } from './root-public-thing-dialog/root-public-thing-dialog.component';
import { ShareOptionsDialogComponent } from './share-options-dialog/share-options-dialog.component';
import { ThingUserDetailsComponent } from './thing-user-details/thing-user-details.component';
import { ThingNavComponent } from './thing-nav/thing-nav.component';
import { PostModule } from '../post/post.module';
import { MediaTypeModule } from '../shared/media-type/media-type.module';
import { PaymentService } from '../shared/payment.service';
import { ThingButtonsModule } from '../shared/thing-buttons/thing-buttons.module';
import {
  MdButtonModule,
  MdCardModule,
  MdChipsModule,
  MdMenuModule,
  MdIconModule,
  MdDialogModule,
  MdSnackBarModule,
  MdInputModule,
  MdAutocompleteModule,
  MdProgressSpinnerModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ThingRoutingModule,
    MdButtonModule,
    MdCardModule,
    MdChipsModule,
    MdMenuModule,
    MdIconModule,
    MdDialogModule,
    MdSnackBarModule,
    MdInputModule,
    MdAutocompleteModule,
    ClipboardModule,
    ReactiveFormsModule,
    MdProgressSpinnerModule,
    MdTabsModule,
    PostModule,
    MediaTypeModule,
    MdToolbarModule,
    ThingButtonsModule,
    MdTooltipModule
  ],
  entryComponents: [
    ShareDialogComponent,
    ReportDialogComponent,
    NoContentPostsDialogComponent,
    NoContentRelatedDialogComponent,
    NoContentUnderneathDialogComponent,
    NoContentMediaDialogComponent,
    PaymentDialogComponent,
    RootPublicThingDialogComponent,
    ShareOptionsDialogComponent
  ],
  declarations: [
    ThingDetailsComponent,
    ThingChildrenComponent,
    ThingRelatedComponent,
    ShareDialogComponent,
    SearchUnderneathComponent,
    ReportDialogComponent,
    ThingPostsComponent,
    ThingMediaComponent,
    ThingMediaItemsComponent,
    ThingPostsItemsComponent,
    DescriptionComponent,
    NoContentPostsDialogComponent,
    NoContentRelatedDialogComponent,
    NoContentUnderneathDialogComponent,
    NoContentMediaDialogComponent,
    MediaViewerComponent,
    PaymentDialogComponent,
    RootPublicThingDialogComponent,
    ShareOptionsDialogComponent,
    ThingUserDetailsComponent,
    ThingNavComponent
  ],
  providers: [
    PaymentController,
    PaymentService
  ]
})
export class ThingModule { }
