import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Things, ThingsController } from 'api-typings/bundle';
import { MdDialog, MdTabChangeEvent } from '@angular/material';

import { ShareDialogComponent } from '../share-dialog/share-dialog.component';
import { AuthService } from '../../shared/auth.service';
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';
import { PublicThingService } from '../../shared/public-thing.service';
import { TutorialArea, TutorialService } from '../../tutorial/tutorial.service';
import { PaymentService } from '../../shared/payment.service';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';
import { RootPublicThingDialogComponent } from '../root-public-thing-dialog/root-public-thing-dialog.component';
import { ShareOptionsDialogComponent } from '../share-options-dialog/share-options-dialog.component';
import * as marked from 'marked';
import * as emojione from 'emojione';

@Component({
  selector: 'app-thing-details',
  templateUrl: './thing-details.component.html',
  styleUrls: ['./thing-details.component.scss']
})
export class ThingDetailsComponent implements OnInit {

  thingId: number;
  version: number = null;
  thingModel: Things.Api.Models.ThingModel;
  isProcessing = true;
  isProcessingLike = false;
  isProcessingFollow = false;
  logedInUserId: number = this.authService.getLogedInUserId();
  showAuthorizedMenuItems = false;
  showPublicThingAuthorizeMenuItem = false;
  isRootPublicThing = false;

  viewedSubTab = true;
  viewedUserDetailsTab = false;
  viewedRelatedTab = false;
  viewedPostsTab = false;
  viewedGallery = false;

  constructor(private titleService: Title,
    private route: ActivatedRoute,
    private router: Router,
    private thingsController: ThingsController,
    public dialog: MdDialog,
    private authService: AuthService,
    private publicThingService: PublicThingService,
    private tutorial: TutorialService,
    private paymentService: PaymentService) { }

  ngOnInit() {
    // TODO: this is maybe bad for perf
    if (!this.tutorial.hasDoneTutorial(TutorialArea.thingDetails)) {
      this.router.navigate(['/tutorial', TutorialArea.thingDetails]);
    }

    this.route.paramMap.subscribe(params => {
      if (params.has('id') && params.has('version')) {
        this.version = +params.get('version');
        this.getThingId(params.get('id'));

      } else if (params.has('id')) {
        this.version = null;
        this.getThingId(params.get('id'));
      }
    });

    this.authService.logedInUserId$.subscribe(id => {
      this.logedInUserId = id;
    });
  }

  getThingId(idParam: string) {
    if (idParam.startsWith('@')) {
      this.thingsController.readThingForHierarchy(idParam).subscribe(
        data => {
          this.thingId = data;
          this.loadThing();
        });
    } else {
      this.thingId = +idParam;
      this.loadThing();
    }
  }

  loadThing() {
    window.scrollTo(0, 0);

    this.thingsController.readThing(this.thingId, this.version).subscribe(
      data => {
        this.thingModel = data;

        this.setRootPublicThing();
        this.hasAccessOrNavigate();
        this.showPublicThingAuthorizeOrNavigate();

        this.isProcessing = false;

        if (this.thingModel.description !== null && this.thingModel.description.content !== null && this.thingModel.description.content !== '') {
          // Render markdown
          this.thingModel.description.content = marked(this.thingModel.description.content);
          // Render emoji
          (<any>emojione).ascii = true;
          this.thingModel.description.content = emojione.toImage(this.thingModel.description.content);
        }
      }, error => {
        this.isProcessing = false;
      });
  }

  onTabSelectChange(event: MdTabChangeEvent) {
    let tabIndex = 0;
    if (!this.viewedSubTab && event.index === tabIndex) {
      this.viewedSubTab = true;
    }
    if (this.thingModel.parentHierarchy === null) {
      tabIndex++;
      if (!this.viewedUserDetailsTab && event.index === tabIndex) {
        this.viewedUserDetailsTab = true;
      }
    }
    tabIndex++;
    if (!this.viewedRelatedTab && event.index === tabIndex) {
      this.viewedRelatedTab = true;
    }
    tabIndex++;
    if (!this.viewedPostsTab && event.index === tabIndex) {
      this.viewedPostsTab = true;
    }
    tabIndex++;
    if (!this.viewedGallery && event.index === tabIndex) {
      this.viewedGallery = true;
    }
  }

  // @HostListener('click', ['$event'])
  // onClick(event: Event) {
  //   const target = event.target as HTMLAnchorElement;
  //   if (target.className === 'thing-ref') {
  //     this.router.navigate([target.pathname]);
  //     return false;
  //   }
  // }

  openShareDialog() {
    const dialogRef = this.dialog.open(ShareOptionsDialogComponent);
    dialogRef.componentInstance.thingTitle = this.thingModel.thing.title;
    dialogRef.componentInstance.thingId = this.thingModel.thing.id;
    dialogRef.componentInstance.logedInUserId = this.logedInUserId;
  }

  openReportDialog() {
    const dialogRef = this.dialog.open(ReportDialogComponent);
    dialogRef.componentInstance.thingId = this.thingModel.thing.id;
  }

  setRootPublicThing() {
    if (this.thingModel.parentHierarchy !== null && this.thingModel.parentHierarchy.length === 2 &&
      +this.thingModel.parentHierarchy[1][0] === 2) {
      this.isRootPublicThing = true;
    } else {
      this.isRootPublicThing = false;
    }
  }

  openRootPublicThingAppendDialog() {
    this.dialog.open(RootPublicThingDialogComponent);
  }

  hasAccessOrNavigate(shouldNavigateToCreate = false, isShortcutThing = false) {
    if (this.thingModel.parentHierarchy !== null &&
      this.thingModel.parentHierarchy[0] !== undefined && this.logedInUserId === +this.thingModel.parentHierarchy[0][0]) {
      // Loged in user thing hierarchy
      if (shouldNavigateToCreate && isShortcutThing) {
        this.router.navigate(['/create', this.thingModel.thing.id], { queryParams: { shortcut: true } });
      } else if (shouldNavigateToCreate) {
        this.router.navigate(['/create', this.thingModel.thing.id]);
      }
      this.showAuthorizedMenuItems = true;
    } else if (this.thingModel.parentHierarchy === null && this.logedInUserId === this.thingModel.thing.id) {
      // Current user profile thing
      if (shouldNavigateToCreate && isShortcutThing) {
        this.router.navigate(['/create', this.thingModel.thing.id], { queryParams: { shortcut: true } });
      } else if (shouldNavigateToCreate) {
        this.router.navigate(['/create', this.thingModel.thing.id]);
      }
      this.showAuthorizedMenuItems = true;
    } else if (this.thingModel.parentHierarchy !== null && this.thingModel.parentHierarchy.length >= 3 &&
      +this.thingModel.parentHierarchy[1][0] === 2 &&
      this.publicThingService.hasPublicThingToken(+this.thingModel.parentHierarchy[2][0])) {
      // Public thing hierarchy (children) access
      // TODO: This should only be true for creation not for edit
      if (shouldNavigateToCreate && isShortcutThing) {
        this.router.navigate(['/create/public', this.thingModel.thing.id],
          { queryParams: { rootId: +this.thingModel.parentHierarchy[2][0], shortcut: true } });
      } else if (shouldNavigateToCreate) {
        this.router.navigate(['/create/public', this.thingModel.thing.id],
          { queryParams: { rootId: +this.thingModel.parentHierarchy[2][0] } });
      }
      this.showAuthorizedMenuItems = true;
    } else if (this.thingModel.parentHierarchy !== null && this.thingModel.parentHierarchy.length === 2 &&
      +this.thingModel.parentHierarchy[1][0] === 2 &&
      this.publicThingService.hasPublicThingToken(this.thingModel.thing.id)) {
      // Root public thing
      if (shouldNavigateToCreate && isShortcutThing) {
        this.router.navigate(['/create/public', this.thingModel.thing.id],
          { queryParams: { rootId: this.thingModel.thing.id, shortcut: true } });
      } else if (shouldNavigateToCreate) {
        this.router.navigate(['/create/public', this.thingModel.thing.id], { queryParams: { rootId: this.thingModel.thing.id } });
      }
      this.showAuthorizedMenuItems = true;
    } else if (this.thingModel.thing.id === 2) {
      // Public thing (Id = 2)
      if (shouldNavigateToCreate) {
        this.router.navigate(['/create/public']);
      }
      this.showAuthorizedMenuItems = true;
    } else {
      this.showAuthorizedMenuItems = false;
    }
  }

  goToCreateThing() {
    this.hasAccessOrNavigate(true);
  }

  goToCreateShortcutThing() {
    this.hasAccessOrNavigate(true, true);
  }

  goToAuthorizePublicThing() {
    this.showPublicThingAuthorizeOrNavigate(true);
  }

  showPublicThingAuthorizeOrNavigate(shouldNavigateToPublicAuth = false) {
    if (this.thingModel.parentHierarchy !== null && this.thingModel.parentHierarchy.length >= 3 &&
      +this.thingModel.parentHierarchy[1][0] === 2 &&
      !this.publicThingService.hasPublicThingToken(+this.thingModel.parentHierarchy[2][0])) {
      // Public thing hierarchy (children) access
      if (shouldNavigateToPublicAuth) {
        this.router.navigate(['/authorize', +this.thingModel.parentHierarchy[2][0]], { queryParams: { returnUrl: this.router.url }});
      }
      this.showPublicThingAuthorizeMenuItem = true;
    } else if (this.thingModel.parentHierarchy !== null && this.thingModel.parentHierarchy.length === 2 &&
      +this.thingModel.parentHierarchy[1][0] === 2 &&
      !this.publicThingService.hasPublicThingToken(this.thingModel.thing.id)) {
      // Root public thing
      if (shouldNavigateToPublicAuth) {
        this.router.navigate(['/authorize', this.thingModel.thing.id], { queryParams: { returnUrl: this.router.url }});
      }
      this.showPublicThingAuthorizeMenuItem = true;
    } else {
      this.showPublicThingAuthorizeMenuItem = false;
    }
  }

  like() {
    this.isProcessingLike = true;

    const viewModel = new Things.Api.ViewModels.Thing.ThingLikeViewModel;
    viewModel.likeThingId = this.thingModel.thing.id;
    this.thingsController.createThingLike(viewModel).subscribe(() => {
      this.thingModel.thing.likes++;
      this.thingModel.liked = true;
      this.isProcessingLike = false;
    });
  }

  unlike() {
    this.isProcessingLike = true;

    const viewModel = new Things.Api.ViewModels.Thing.ThingLikeViewModel;
    viewModel.likeThingId = this.thingModel.thing.id;
    this.thingsController.deleteThingLike(viewModel).subscribe(() => {
      this.thingModel.thing.likes--;
      this.thingModel.liked = false;
      this.isProcessingLike = false;
    });
  }

  follow() {
    this.isProcessingFollow = true;

    const viewModel = new Things.Api.ViewModels.Thing.ThingFollowerViewModel;
    viewModel.followThingId = this.thingModel.thing.id;
    this.thingsController.createThingFollower(viewModel).subscribe(() => {
      this.thingModel.thing.followers++;
      this.thingModel.followed = true;
      this.isProcessingFollow = false;
    });
  }

  unfollow() {
    this.isProcessingFollow = true;

    const viewModel = new Things.Api.ViewModels.Thing.ThingFollowerViewModel;
    viewModel.followThingId = this.thingModel.thing.id;
    this.thingsController.deleteThingFollower(viewModel).subscribe(() => {
      this.thingModel.thing.followers--;
      this.thingModel.followed = false;
      this.isProcessingFollow = false;
    });
  }

  // TODO: doesn't yet work
  export() {
    this.thingsController.exportThings().subscribe(data => {
      const blob = new Blob([data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  donateToThings() {
    const dialogRef = this.dialog.open(PaymentDialogComponent);

    dialogRef.afterClosed().subscribe(amount => {
      if (amount !== undefined && amount !== null && amount !== '') {
        this.paymentService.openCheckout('Donate', +amount, (token: any) => this.paymentService.takePayment('Donate', +amount, token));
      }
    });
  }
}
