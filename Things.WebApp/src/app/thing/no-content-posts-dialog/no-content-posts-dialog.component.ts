import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-content-posts-dialog',
  templateUrl: './no-content-posts-dialog.component.html',
  styleUrls: ['./no-content-posts-dialog.component.scss']
})
export class NoContentPostsDialogComponent implements OnInit {

  thingHierarchy: string;
  thingUser: string;

  constructor() { }

  ngOnInit() {
  }

}
