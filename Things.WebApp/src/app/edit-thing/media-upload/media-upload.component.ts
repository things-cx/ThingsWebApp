import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MediaUploaderService } from '../../shared/media-uploader.service';
import { Things } from 'api-typings/bundle';

@Component({
  selector: 'app-media-upload',
  templateUrl: './media-upload.component.html',
  styleUrls: ['./media-upload.component.scss']
})
export class MediaUploadComponent {

  isImageUploading = false;
  @Output() onImageUploaded: EventEmitter<string> = new EventEmitter();
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private mediaUploaderService: MediaUploaderService) { }

  openUpload() {
    (<HTMLInputElement>this.fileInput.nativeElement).click();
  }

  onThingImageChange(event: Event) {
    this.isImageUploading = true;
    const htmlFileInput = event.srcElement as HTMLInputElement;

    // TODO: compress image for smaller + faster uploads

    if (htmlFileInput.files != null && htmlFileInput.files.length > 0) {
      this.mediaUploaderService.uploadFile(htmlFileInput.files.item(0), Things.Api.Models.BolbMediaType.thingImage).subscribe(
        data => {
          this.isImageUploading = false;
          this.onImageUploaded.emit(data.url);
        }, error => {
          // TODO: do something
          this.isImageUploading = false;
        });
    }
  }
}
