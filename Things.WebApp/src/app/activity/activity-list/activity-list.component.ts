import { Component, OnInit } from '@angular/core';
import { Things, PostController } from 'api-typings/bundle';
import { Router, ActivatedRoute } from '@angular/router';
import { MdTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {

  officialPosts = true;

  viewedPostsTab = true;
  viewedThingsTab = false;

  constructor(private postController: PostController,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParams => {
      if (queryParams.has('unofficial')) {
        this.officialPosts = !(queryParams.get('unofficial') === 'true');
      }
    });
  }

  onTabSelectChange(event: MdTabChangeEvent) {
    if (!this.viewedPostsTab && event.index === 0) {
      this.viewedPostsTab = true;
    }
    if (!this.viewedThingsTab && event.index === 1) {
      this.viewedThingsTab = true;
    }
  }
}
