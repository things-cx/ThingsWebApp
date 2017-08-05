import { Component, OnInit } from '@angular/core';
import { Things, ThingsController, PostController } from 'api-typings/bundle';
import { Router, ActivatedRoute } from '@angular/router';
import { FormService } from 'app/shared/form.service';
import { MdDialog } from '@angular/material';
import { PreviewMediaDialogComponent } from 'app/edit-thing/preview-media-dialog/preview-media-dialog.component';
import { TutorialService, TutorialArea } from 'app/tutorial/tutorial.service';
import { MentionDialogComponent } from 'app/shared/editor/mention-dialog/mention-dialog.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  isProcessing = false;
  mediaUrl: string = null;
  formErrors;
  cursorSelectionRange: Range;
  isLoadingReplyPost = false;
  post: Things.Api.Models.Post.PostModel;
  replyToPostUId: string;

  constructor(private thingsController: ThingsController,
    private postController: PostController,
    private route: ActivatedRoute,
    private router: Router,
    private formService: FormService,
    private tutorial: TutorialService,
    public dialog: MdDialog) { }

  ngOnInit() {
    if (!this.tutorial.hasDoneTutorial(TutorialArea.createPost)) {
      this.router.navigate(['/tutorial', TutorialArea.createPost]);
    }

    // TODO: don't do this!
    document.getElementById('box').focus();
    this.saveSelection();

    this.route.queryParamMap.subscribe(queryParams => {
      if (queryParams.has('ref')) {
        this.insertMention(queryParams.get('ref'));
      }

      if (queryParams.has('replyTo')) {
        this.replyToPost(queryParams.get('replyTo'));
      }
    });
  }

  createPost(element: HTMLDivElement) {
    this.isProcessing = true;

    const viewModel = new Things.Api.ViewModels.Post.Create.CreatePostViewModel;
    viewModel.replyToPostUId = this.replyToPostUId;
    viewModel.content = element.textContent;
    viewModel.media = this.mediaUrl;
    viewModel.htmlContent = element.innerHTML;

    this.postController.createPost(viewModel).subscribe(data => {
      const link = ['/post/post', data.uId];
      this.router.navigate(link, { queryParams: { didcreate: true } });
    }, error => {
      this.formErrors = this.formService.showServerErrors(error);

      this.isProcessing = false;
    });
  }

  replyToPost(uId: string) {
    this.isLoadingReplyPost = true;
    this.postController.getPost(uId).subscribe(data => {
      this.isLoadingReplyPost = false;
      this.post = data;
      this.replyToPostUId = this.post.post.uId;
    });
  }

  onUrlSave(url: string) {
    this.mediaUrl = url;
  }

  removeMedia() {
    this.mediaUrl = null;
  }

  saveSelection(): void {
    if (window.getSelection) {
      const selection = window.getSelection();
      if (selection.getRangeAt && selection.rangeCount) {
        this.cursorSelectionRange = selection.getRangeAt(0);
      } else {
        this.cursorSelectionRange = null;
      }
    }
  }

  restoreSelection() {
    // Restore selection
    if (this.cursorSelectionRange) {
      if (window.getSelection) {
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(this.cursorSelectionRange);
      }
    }
  }

  getRange(): Range {
    if (window.getSelection) {
      const selection = window.getSelection();
      if (selection.rangeCount) {
        return selection.getRangeAt(0);
      }
    }

    return null;
  }

  insertMention(name: string) {
    const range = this.getRange();
    const element = document.createElement('span') as HTMLSpanElement;
    element.innerText = name;
    element.className = 'mention';
    element.contentEditable = 'false';
    range.insertNode(element);

    range.collapse(false);
    const textNode = document.createTextNode('\u00A0');
    range.insertNode(textNode);
    range.collapse(false);
  }

  openMentionDialog(content: HTMLDivElement) {
    content.focus();
    this.saveSelection();
    // TODO: append dialog in comp name (my standard)
    const dialogRef = this.dialog.open(MentionDialogComponent);

    dialogRef.afterClosed().subscribe((hierarchy: string) => {
      if (hierarchy !== undefined && hierarchy !== null && hierarchy !== '') {
        this.restoreSelection();
        this.insertMention(hierarchy);
      }
    });
  }

  onKeydown(event: KeyboardEvent, content: HTMLDivElement) {
    if (event.keyCode === 50 && event.shiftKey === true) {
      event.preventDefault();
      this.openMentionDialog(content);
    }
  }
}
