import { Component, OnInit } from '@angular/core';
import { ThingsController, Things, PostController } from 'api-typings/bundle';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-likes',
  templateUrl: './post-likes.component.html',
  styleUrls: ['./post-likes.component.scss']
})
export class PostLikesComponent implements OnInit {

  postId: number;
  things: Things.Api.Models.Thing[];
  skip = 0;
  isProcessing = true;

  constructor(private postController: PostController,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.postId = +params.get('id');
        this.things = [];
        this.skip = 0;
        this.getPostLikes();
      }
    });
  }

  getPostLikes() {
    this.isProcessing = true;

    const viewModel = new Things.Api.ViewModels.Thing.GetThingLikesViewModel;
    viewModel.skip = this.skip;

    this.postController.getPostLikes(this.postId, viewModel).subscribe(data => {
      this.isProcessing = false;
      this.things = data;
    });
  }

  loadMore() {
    this.isProcessing = true;

    this.skip += 10;
    const viewModel = new Things.Api.ViewModels.Thing.GetThingLikesViewModel;
    viewModel.skip = this.skip;

    this.postController.getPostLikes(this.postId, viewModel).subscribe(data => {
      this.isProcessing = false;
      this.things = this.things.concat(data);
    });
  }
}
