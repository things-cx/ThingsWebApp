import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MdDialog } from '@angular/material';
import { MentionComponent, Mention } from 'app/shared/editor/mention/mention.component';
import { Things } from 'api-typings/bundle';
import * as marked from 'marked';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import {
  MarkdownHelperDialogComponent,
  MarkdownHelperType
} from 'app/shared/editor/markdown-helper-dialog/markdown-helper-dialog.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnChanges {

  @Input() thingModel: Things.Api.Models.ThingModel;
  @Output() onSave: EventEmitter<string> = new EventEmitter();
  mentions: Mention[];
  viewPreviewScreen = false;
  hasLocalBackup = false;
  previewHTML = '';
  backupPreviewHTML = '';
  textAreaKeyupTimeout: any;
  localStorageBackupKey = 'description_backup_';
  markdownHelperTypeEnum = MarkdownHelperType;

  constructor(public dialog: MdDialog,
    private router: Router) { }

  ngOnInit() { }

  // Check @Input() thingModel for changes to update posts
  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'thingModel') {
        this.loadMentions();
        this.getLocalBackup();
      }
    }
  }

  getLocalBackup() {
    if (this.thingModel !== null && this.thingModel !== undefined) {
      const localBackup = localStorage.getItem(this.localStorageBackupKey + this.thingModel.thing.id);
      if (localBackup !== null && localBackup !== undefined && localBackup !== '') {
        this.hasLocalBackup = true;
      }
    }
  }

  loadMentions() {
    // TODO: this could be made more performant
    if (this.thingModel != null && this.thingModel.description.content !== null && this.thingModel.description.content !== '') {
      let description = this.thingModel.description.content;

      for (const mention of this.thingModel.mentions) {
        let linkName = this.thingModel.description.content.substring(mention.indicies[0], mention.indicies[1]);
        let linkHref = '';
        if (mention.version !== null) {
          linkHref = `/thing/${mention.thingId}/${mention.version}`;
        } else {
          linkHref = `/thing/${mention.thingId}`;
        }
        const link = `<a class="mention" href="${linkHref}">${linkName}</a>`;

        linkName = linkName.replace(/[.+?^${}()|[\]\\]/g, '\\$&');

        description = description.replace(new RegExp(linkName, 'g'), link);
      }
      this.thingModel.description.content = description;
    }
  }

  openMentionDialog() {
    // TODO: append dialog in comp name (my standard)
    const dialogRef = this.dialog.open(MentionComponent);

    dialogRef.afterClosed().subscribe((result: Mention) => {
      if (result !== undefined && result !== null && result.hierarchy !== '') {
        // CONTINUE!!!
        // this.insertMention(result.hierarchy);
      }
    });
  }

  viewLocalBackup() {
    const localBackup = localStorage.getItem(this.localStorageBackupKey + this.thingModel.thing.id);
    this.previewHTML = marked(localBackup);
    this.viewPreviewScreen = true;
  }

  useLocalBackup(textArea: HTMLTextAreaElement) {
    const localBackup = localStorage.getItem(this.localStorageBackupKey + this.thingModel.thing.id);
    textArea.value = localBackup;
    this.hasLocalBackup = false;
    this.viewPreviewScreen = false;
  }

  saveChanges(textArea: HTMLTextAreaElement) {
    localStorage.removeItem(this.localStorageBackupKey + this.thingModel.thing.id)
    this.onSave.emit(textArea.value);
  }

  viewPreview(textArea: HTMLTextAreaElement) {
    this.previewHTML = marked(textArea.value);
    this.viewPreviewScreen = true;
  }

  goToMarkdownInfo() {
    const link = ['/thing', 7];
    const url = environment.hostUrlForSharingToWeb + this.router.createUrlTree(link).toString()
    window.open(url);
  }

  wrap(textArea: HTMLTextAreaElement, value) {
    if (textArea.selectionStart || textArea.selectionStart === 0) {
      const startPos = textArea.selectionStart;
      const endPos = textArea.selectionEnd;
      textArea.value = textArea.value.substring(0, startPos)
        + value
        + textArea.value.substring(startPos, endPos)
        + value
        + textArea.value.substring(endPos, textArea.value.length);

      textArea.selectionStart = startPos + value.length;
      textArea.selectionEnd = endPos + value.length;
    } else {
      textArea.value += value;
    }

    textArea.focus();
  }

  insert(textArea: HTMLTextAreaElement, value) {
    if (textArea.selectionStart || textArea.selectionStart === 0) {
      const startPos = textArea.selectionStart;
      const endPos = textArea.selectionEnd;
      textArea.value = textArea.value.substring(0, startPos)
        + value
        + textArea.value.substring(startPos, endPos)
        + textArea.value.substring(endPos, textArea.value.length);

      textArea.selectionStart = startPos + value.length;
      textArea.selectionEnd = endPos + value.length;
    } else {
      textArea.value += value;
    }

    textArea.focus();
  }

  markdownHelper(textArea: HTMLTextAreaElement, markdownHelperType: MarkdownHelperType) {
    const dialog = this.dialog.open(MarkdownHelperDialogComponent);
    dialog.componentInstance.markdownHelperType = markdownHelperType;

    let startPos = textArea.selectionStart;
    let endPos = textArea.selectionEnd;

    const value = textArea.value.substring(startPos, endPos);
    if (value !== undefined && value !== '') {
      dialog.componentInstance.input = textArea.value.substring(startPos, endPos);
    }

    dialog.afterClosed().subscribe((result: string) => {
      if (result !== null && result !== undefined) {
        switch (markdownHelperType) {
          case MarkdownHelperType.image:
            textArea.value = `${textArea.value.substring(0, startPos)}${result}${textArea.value.substring(endPos, textArea.value.length)}`;
            startPos = startPos + 2;
            endPos = endPos + 2;
            break;
          case MarkdownHelperType.youtube: case MarkdownHelperType.imgLink:
            textArea.value = `${textArea.value.substring(0, startPos)}${result}${textArea.value.substring(endPos, textArea.value.length)}`;
            startPos = startPos + 3;
            endPos = endPos + 3;
            break;
          case MarkdownHelperType.link: case MarkdownHelperType.mailto:
            textArea.value = `${textArea.value.substring(0, startPos)}${result}${textArea.value.substring(endPos, textArea.value.length)}`;
            startPos++;
            endPos++
            break;

          default:
            break;
        }

        textArea.selectionStart = startPos;
        textArea.selectionEnd = endPos;
        textArea.focus();
        this.onTextAreaKeyup(textArea);
      }
    });
  }

  onTextAreaKeyup(textArea: HTMLTextAreaElement) {
    textArea.style.height = '1px';
    textArea.style.height = (10 + textArea.scrollHeight) + 'px';

    clearTimeout(this.textAreaKeyupTimeout);

    this.textAreaKeyupTimeout = setTimeout(() => {
      localStorage.setItem(this.localStorageBackupKey + this.thingModel.thing.id, textArea.value);
      if (this.hasLocalBackup) {
        this.hasLocalBackup = false;
      }
    }, 1500);
  }
}
