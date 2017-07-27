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
    this.thingId = +this.route.snapshot.params['id'];

    this.route.queryParamMap.subscribe(queryParams => {
      if (queryParams.has('signup')) {
        this.wasSignUp = queryParams.get('signup') === 'true';
      }
    });
  }

  doneEditing() {
    if (this.wasSignUp) {
      this.router.navigate(['/home']);
    } else {
      const link = ['/thing', this.thingId];
      this.router.navigate(link);
    }
  }
}
