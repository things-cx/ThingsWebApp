import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Things, PostController } from 'api-typings/bundle';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { MdTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-thing-media',
  templateUrl: './thing-media.component.html',
  styleUrls: ['./thing-media.component.scss']
})
export class ThingMediaComponent {

  // TODO: should this be a seperate call when first entering thing details
  // (info can be fetched in one call and then afterwards only children if needed)

  @Input() id: number;
  viewedAllPosts = true;
  viewedOfficialPosts = false;

  constructor(private postController: PostController,
    private router: Router) { }

  onTabSelectChange(event: MdTabChangeEvent) {
    if (!this.viewedAllPosts && event.index === 0) {
      this.viewedAllPosts = true;
    }
    if (!this.viewedOfficialPosts && event.index === 1) {
      this.viewedOfficialPosts = true;
    }
  }
}
