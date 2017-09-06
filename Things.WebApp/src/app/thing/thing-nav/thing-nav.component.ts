import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { MdDialog } from '@angular/material';
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thing-nav',
  templateUrl: './thing-nav.component.html',
  styleUrls: ['./thing-nav.component.scss']
})
export class ThingNavComponent implements OnInit {

  @Input() thingId: number;
  @Input() logedInUserId: number;
  @Input() showAuthorizedMenuItems: boolean;
  @Input() showPublicThingAuthorizeMenuItem: boolean;
  @Input() parentHierarchy: string[][];

  @Output() onAuthorizePublicThing: EventEmitter<{}> = new EventEmitter();

  constructor(private location: Location,
    public dialog: MdDialog,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() { }

  back() {
    this.location.back();
  }

  home() {
    if (this.logedInUserId) {
      this.router.navigate(['/activity']);
    } else {
      this.router.navigate(['/']);
    }
  }

  goToAuthorizePublicThing() {
    this.onAuthorizePublicThing.emit();
  }

  openReportDialog() {
    const dialogRef = this.dialog.open(ReportDialogComponent);
    dialogRef.componentInstance.thingId = this.thingId;
  }

  logout() {
    this.authService.removeToken();
  }
}
