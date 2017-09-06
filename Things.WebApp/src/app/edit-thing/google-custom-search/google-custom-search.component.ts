import { Component, EventEmitter, Output } from '@angular/core';
import { GoogleCustomSearchService } from '../../shared/google-custom-search.service';
import { PreviewMediaDialogComponent } from '../../edit-thing/preview-media-dialog/preview-media-dialog.component';
import { MdDialog } from '@angular/material';

@Component({
  selector: 'app-google-custom-search',
  templateUrl: './google-custom-search.component.html',
  styleUrls: ['./google-custom-search.component.scss']
})
export class GoogleCustomSearchComponent {

  isSearching = false;
  searchResultPageIndex = 1;
  imageResults: Link[] = [];
  selectedImageUrl: string;
  searchBoxInput: string;
  @Output() onImageSelected: EventEmitter<string> = new EventEmitter();

  constructor(private googleCustomSearh: GoogleCustomSearchService,
  public dialog: MdDialog) { }

  onSearch(searchInput: HTMLInputElement) {
    this.searchGoogleImages(searchInput.value);
  }

  searchGoogleImages(term: string) {
    if (term !== '') {
      if (term !== this.searchBoxInput) {
        this.imageResults = [];
      }

      this.searchBoxInput = term;
      this.isSearching = true;

      this.googleCustomSearh.search(term, this.searchResultPageIndex).subscribe(data => {
        this.isSearching = false;
        try {
          const json: GoogleResults = data.json();
          this.imageResults.push.apply(this.imageResults, json.items);
        } catch (error) {

        }
      }, error => {
        // TODO: do something
        this.isSearching = false;
      });
    }
  }

  getMore() {
    if (this.searchBoxInput !== '') {
      this.searchResultPageIndex += this.imageResults.length;
      this.searchGoogleImages(this.searchBoxInput);
    }
  }

  selectImage(image: Link) {
    const dialogRef = this.dialog.open(PreviewMediaDialogComponent);
    dialogRef.componentInstance.url = image.link;

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onImageSelected.emit(image.link);
      }
    });
  }
}

class GoogleResults {
  items: Link[];
}

class Link {
  link: string;
}
