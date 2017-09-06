import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Things, ThingsController, PostController } from 'api-typings/bundle';
import { Router, ActivatedRoute } from '@angular/router';
import { FormService } from '../../shared/form.service';
import { MdDialog } from '@angular/material';
import { PreviewMediaDialogComponent } from '../../edit-thing/preview-media-dialog/preview-media-dialog.component';
import { TutorialService, TutorialArea } from '../../tutorial/tutorial.service';
import { MentionDialogComponent } from '../../shared/editor/mention-dialog/mention-dialog.component';
import * as emojione from 'emojione';

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
  @ViewChild('content') content: ElementRef;

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

    this.content.nativeElement.focus();
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
    viewModel.media = this.mediaUrl;
    viewModel.htmlContent = element.innerHTML;

    // Convert emojis back to shortnames to save
    const emojis = this.content.nativeElement.getElementsByClassName('emojione');
    for (let i = 0; i < emojis.length; i++) {
      const img = emojis.item(i) as HTMLImageElement;
      const shortname = document.createTextNode(img.title);
      img.appendChild(shortname);
    }

    // Add content
    viewModel.content = element.textContent;

    // Send to server
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

  insertEmoji(name: string) {
    const range = this.getRange();
    const element = document.createTextNode(name);
    range.insertNode(element);

    // range.collapse(false);
    // const textNode = document.createTextNode('\u00A0');
    // range.insertNode(textNode);
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

  onEmojiInset(emojiShortname: string) {
    this.restoreSelection();
    this.insertEmoji(emojiShortname);
    (<any>emojione).ascii = true;
    const output = emojione.toImage(this.content.nativeElement.innerHTML);
    this.content.nativeElement.innerHTML = output;
    // TODO: cursor loses its index. FIX
  }

  onSaveSelection() {
    this.saveSelection();
  }

  onKeydown(event: KeyboardEvent, content: HTMLDivElement) {
    // TODO: automatically convert to emoji image when user types shortname or unicodes (remember to cater for copy/paste)
    if (event.keyCode === 50 && event.shiftKey) {
      event.preventDefault();
      this.openMentionDialog(content);
    }
  }
}
