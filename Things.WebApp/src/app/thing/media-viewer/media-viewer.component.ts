import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-media-viewer',
  templateUrl: './media-viewer.component.html',
  styleUrls: ['./media-viewer.component.scss']
})
export class MediaViewerComponent implements OnChanges {

  @Input() media: string[];
  activeIndex = 0;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'media') {
        this.activeIndex = 0;
      }
    }
  }

  back() {
    if (this.activeIndex === 0) {
      this.activeIndex = this.media.length - 1;
    } else {
      this.activeIndex--;
    }
  }

  next() {
    // TODO: swithcing out the images to fast (clicking rapidly) freezes it
    if (this.activeIndex >= this.media.length - 1) {
      this.activeIndex = 0;
    } else {
      this.activeIndex++;
    }
  }
}
