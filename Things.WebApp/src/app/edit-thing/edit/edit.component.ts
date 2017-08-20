import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  thingId: number;
  wasSignUp = false;

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.thingId = +params.get('id');
      }
    });

    // TODO: don't think we are using this anymore
    this.route.queryParamMap.subscribe(queryParams => {
      if (queryParams.has('signup')) {
        this.wasSignUp = queryParams.get('signup') === 'true';
      }
    });
  }

  doneEditing() {
    const link = ['/thing', this.thingId];
    this.router.navigate(link);
  }
}
