import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-email',
  templateUrl: './view-email.component.html',
  styleUrls: ['./view-email.component.scss']
})
export class ViewEmailComponent implements OnInit {

  email = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      if (params.has('email')) {
        this.email = params.get('email');
      }
    });
  }
}
