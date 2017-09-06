import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { ThingsController, Things } from 'api-typings/bundle';
import { Observable } from 'rxjs/Observable';
import { TutorialService, TutorialArea } from '../../tutorial/tutorial.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { FormService } from '../../shared/form.service';
import { PreviewMediaDialogComponent } from '../../edit-thing/preview-media-dialog/preview-media-dialog.component';
import { MdDialog } from '@angular/material';

@Component({
  selector: 'app-gif-search',
  templateUrl: './gif-search.component.html',
  styleUrls: ['./gif-search.component.scss']
})
export class GifSearchComponent implements OnInit {

  form: FormGroup;
  formErrors;
  searchResults: Giphy;
  isSearching = false;
  @Output() onGifSelect: EventEmitter<string> = new EventEmitter();

  constructor(private fb: FormBuilder,
    private http: Http,
    private formService: FormService,
    public dialog: MdDialog) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      searchTerm: ['']
    });

    // this.form.get('searchTerm').valueChanges.subscribe(value => { });
  }

  onSearch() {
    this.search();
  }

  search() {
    this.isSearching = true;
    let serachTerm = this.form.get('searchTerm').value;
    if (serachTerm !== '') {
      serachTerm = serachTerm.replace(' ', '+');
      this.http.get(`http://api.giphy.com/v1/gifs/search?q=${serachTerm}&api_key=dc6zaTOxFJmzC`).subscribe(data => {
        this.isSearching = false;

        if (data.ok) {
          const body = data.json() as Giphy;
          this.searchResults = body;

          // console.log(body.data[0].images.downsized.url);
        }
      });
    }
  }

  previewGif(gif: GiphyDataItem) {
    const dialogRef = this.dialog.open(PreviewMediaDialogComponent);
    dialogRef.componentInstance.url = gif.images.fixed_height.url;

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onGifSelect.emit(gif.images.fixed_height.url);
      }
    });
  }

  loadMore() {
    // TODO: add this ^
  }
}

class Giphy {
  data: GiphyDataItem[];
  meta: {
    msg,
    response_id,
    status
  };
  pagination: {
    count,
    offset,
    total_count
  };
}

class GiphyDataItem {
  bitly_gif_url: string;
  bitly_url: string;
  content_url: string;
  embed_url: string;
  id: string;
  images: {
    downsized: Image,
    downsized_large: Image,
    downsized_medium: Image,
    downsized_small: Image,
    downsized_still: Image,
    fixed_height: Image,
    fixed_height_downsampled: Image,
    fixed_height_small: Image,
    fixed_height_small_still: Image,
    fixed_height_still: Image,
    fixed_width: Image,
    fixed_width_downsampled: Image,
    fixed_width_small: Image,
    fixed_width_small_still: Image,
    fixed_width_still: Image,
    looping: Image,
    original: Image,
    original_mp4: Image,
    original_still: Image,
    preview: Image,
    preview_gif: Image,
    preview_webp: Image
  };
  import_datetime: string;
  is_indexable: number;
  rating: string;
  slug: string;
  source: string;
  source_post_url: string;
  source_tld: string;
  trending_datetime: string;
  type: string;
  url: string;
  user: string;
  username: string;
}

class Image {
  height;
  mp4;
  mp4_size;
  size;
  url;
  webp;
  webp_size;
  width;
}
