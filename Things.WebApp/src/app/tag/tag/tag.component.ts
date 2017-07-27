import { Component, OnInit } from '@angular/core';
import { ThingsController, Things } from 'api-typings/bundle';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from 'app/shared/auth.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  things: Observable<Things.Api.Models.Thing[]>;

  constructor(private thingsController: ThingsController,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit() {
    const tagLabel = this.route.snapshot.params['label'];

    this.getThingsForTag(tagLabel);
  }

  getThingsForTag(tag: string) {
    this.route.paramMap.subscribe(params => {
      if (params.has('label')) {
        this.things = this.thingsController.getTag(tag);
      }
    });
  }
}
