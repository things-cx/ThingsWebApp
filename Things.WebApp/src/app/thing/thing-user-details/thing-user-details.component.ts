import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ThingsController, Things, UserController } from 'api-typings/bundle';

@Component({
  selector: 'app-thing-user-details',
  templateUrl: './thing-user-details.component.html',
  styleUrls: ['./thing-user-details.component.scss']
})
export class ThingUserDetailsComponent implements OnChanges {

  @Input() id: number;
  @Input() logedInUserId: number;
  isProcessing = true;
  userThingDetails: Things.Api.ViewModels.Thing.GetUserThingDetailsViewModel;
  userDetailFollowingTypeEnum = Things.Api.ViewModels.Thing.UserDetailFollowingType;

  constructor(private thingsController: ThingsController,
    private userController: UserController) {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'id') {
        this.getUserThingDetails();
      }
    }
  }

  getUserThingDetails() {
    this.isProcessing = true;
    this.thingsController.getUserThingDetails(this.id).subscribe(data => {
      this.isProcessing = false;
      this.userThingDetails = data;
    });
  }

  follow(userDetailFollowingType: Things.Api.ViewModels.Thing.UserDetailFollowingType, event: Event) {
    event.stopPropagation();
    // this.isProcessingFollow = false;

    this.userController.createUserDetailFollower(this.id, userDetailFollowingType).subscribe(() => {
      switch (userDetailFollowingType) {
        case this.userDetailFollowingTypeEnum.posts:
          this.userThingDetails.followedPosts = true;
          break;

        case this.userDetailFollowingTypeEnum.following:
          this.userThingDetails.followedFollowing = true;
          break;

        case this.userDetailFollowingTypeEnum.thingLikes:
          this.userThingDetails.followedThingLikes = true;
          break;

        case this.userDetailFollowingTypeEnum.postLikes:
          this.userThingDetails.followedPostLikes = true;
          break;

        default:
          break;
      }
    });
  }

  unfollow(userDetailFollowingType: Things.Api.ViewModels.Thing.UserDetailFollowingType, event: Event) {
    event.stopPropagation();

    this.userController.deleteUserDetailFollower(this.id, userDetailFollowingType).subscribe(() => {
      switch (userDetailFollowingType) {
        case this.userDetailFollowingTypeEnum.posts:
          this.userThingDetails.followedPosts = false;
          break;

        case this.userDetailFollowingTypeEnum.following:
          this.userThingDetails.followedFollowing = false;
          break;

        case this.userDetailFollowingTypeEnum.thingLikes:
          this.userThingDetails.followedThingLikes = false;
          break;

        case this.userDetailFollowingTypeEnum.postLikes:
          this.userThingDetails.followedPostLikes = false;
          break;

        default:
          break;
      }
    });
  }
}
