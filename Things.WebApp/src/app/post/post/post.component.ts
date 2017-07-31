import { Component, OnInit } from '@angular/core';
import { Things, PostController } from 'api-typings/bundle';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post: Things.Api.Models.Post.PostModel;
  postReplies: Things.Api.Models.Post.PostModel[];
  postUId: string;
  skip = 0;
  isProcessing = true;
  isProcessingReplies = true;
  didCreate = false;

  constructor(private postController: PostController,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('uid')) {
        this.postUId = params.get('uid');
        this.getPost();

        this.postReplies = [];
        this.skip = 0;
        this.getPostReplies();
      }
    });

    this.route.queryParamMap.subscribe(queryParams => {
      if (queryParams.has('didcreate')) {
        if (queryParams.get('didcreate') === 'true') {
          this.didCreate = true;
        }
      }
    });
  }

  getPost() {
    this.postController.getPost(this.postUId).subscribe(data => {
      this.isProcessing = false;
      this.post = data;

      // Navigate to all posts if user created new post
      if (this.didCreate) {
        this.router.navigate(['/post/user', this.post.user.id]);
      }
    });
  }

  getPostReplies() {
    this.isProcessingReplies = true;
    const viewModel = new Things.Api.ViewModels.Post.GetPostRepliesViewModel;
    viewModel.postUId = this.postUId;
    viewModel.skip = this.skip;

    this.postController.getPostReplies(viewModel).subscribe(data => {
      this.isProcessingReplies = false;
      this.postReplies = data;
    });
  }

  loadMore() {
    this.isProcessingReplies = true;

    this.skip += 10;
    const viewModel = new Things.Api.ViewModels.Post.GetPostRepliesViewModel;
    viewModel.postUId = this.postUId;
    viewModel.skip = this.skip;

    this.postController.getPostReplies(viewModel).subscribe(data => {
      this.isProcessingReplies = false;
      this.postReplies = this.postReplies.concat(data);
    });
  }
}
