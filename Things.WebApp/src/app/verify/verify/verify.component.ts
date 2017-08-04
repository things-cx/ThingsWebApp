import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserController } from 'api-typings/bundle';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  code: string;
  message: string;

  constructor(private userController: UserController,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      if (params.has('code')) {
        this.code = params.get('code');

        if (this.code !== undefined && this.code !== '') {
          this.userController.verifyEmail(this.code).subscribe(data => {
            if (data === true) {
              this.message = 'Success';
            } else {
              this.message = 'Error';
            }
          }, error => {
            this.message = 'Error';
          });
        }
      }
    });
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
