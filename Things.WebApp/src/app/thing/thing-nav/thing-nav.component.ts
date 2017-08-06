import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { MdDialog } from '@angular/material';
import { ReportDialogComponent } from 'app/thing/report-dialog/report-dialog.component';
import { AuthService } from 'app/shared/auth.service';

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
    private authService: AuthService) { }

  ngOnInit() { }

  back() {
    this.location.back();
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
