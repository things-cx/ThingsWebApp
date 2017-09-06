import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MdTabChangeEvent } from '@angular/material';
import { Things, PostController } from 'api-typings/bundle';

@Component({
  selector: 'app-thing-posts',
  templateUrl: './thing-posts.component.html',
  styleUrls: ['./thing-posts.component.scss']
})
export class ThingPostsComponent implements OnChanges {

  // TODO: should this be a seperate call when first entering thing details
  // (info can be fetched in one call and then afterwards only children if needed)

  @Input() thing: Things.Api.Models.Thing;
  @Input() parentHierarchy: string[][];
  @Input() logedInUserId: number;
  generatedHierarchy: string;

  viewedAllPosts = true;
  viewedOfficialPosts = false;

  constructor(private router: Router) { }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'thing') {
        this.generatedHierarchy = this.buildHierarchy();
      }
    }
  }

  goToCreatePostWithRef() {
    this.router.navigate(['/create-post'], { queryParams: { ref: this.buildHierarchy() } });
  }

  buildHierarchy(): string {
    let ref = '';
    if (this.parentHierarchy !== null) {
      for (const item of this.parentHierarchy) {
        ref += '@' + item[1];
      }
    }

    ref += `@${this.thing.title}`;

    return ref;
  }

  onTabSelectChange(event: MdTabChangeEvent) {
    if (!this.viewedAllPosts && event.index === 0) {
      this.viewedAllPosts = true;
    }
    if (!this.viewedOfficialPosts && event.index === 1) {
      this.viewedOfficialPosts = true;
    }
  }
}
