import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MdDialog } from '@angular/material';
import { LinkComponent } from 'app/shared/editor/link/link.component';
import { MentionComponent, Mention } from 'app/shared/editor/mention/mention.component';
import { ImageComponent } from 'app/shared/editor/image/image.component';
import { Things } from 'api-typings/bundle';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnChanges {

  @Input() thingModel: Things.Api.Models.ThingModel;
  @Output() onSave: EventEmitter<string> = new EventEmitter();
  box: HTMLDivElement;
  cursorSelectionRange: Range;
  showHeaderOptions = false;
  mentions: Mention[];

  constructor(public dialog: MdDialog) { }

  ngOnInit() {
    this.box = <HTMLDivElement>document.getElementById('box');
  }

  // Check @Input() thingModel for changes to update posts
  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'thingModel') {
        this.loadMentions();
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

  wrap(tagName) {
    const range = this.getRange();
    if (range.toString() !== '') {
      const element = document.createElement(tagName);
      element.innerText = range.toString();
      range.deleteContents();
      range.insertNode(element);
    }
  }

  wrapList(listTag) {
    const range = this.getRange();
    if (range.toString() !== '') {
      const listElement = document.createElement(listTag);
      const listItem = document.createElement('li');
      listItem.innerText = range.toString();
      listElement.appendChild(listItem);
      range.deleteContents();
      range.insertNode(listElement);
    }
  }

  insert(tagName) {
    const range = this.getRange();
    const element = document.createElement(tagName);
    range.insertNode(element);
  }

  insertWithText(tagName, text) {
    const range = this.getRange();
    const element = document.createElement(tagName);
    element.innerText = text;
    range.insertNode(element);
  }

  insertLink(name: string, url: string) {
    const range = this.getRange();
    const element = document.createElement('a') as HTMLAnchorElement;
    element.innerText = name;
    element.href = url;
    range.insertNode(element);
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

  bold() {
    this.wrap('strong');
  }

  italic() {
    this.wrap('i');
  }

  underline() {
    this.wrap('u');
  }

  h1() {
    this.wrap('h1');
  }

  h2() {
    this.wrap('h2');
  }

  h3() {
    this.wrap('h3');
  }

  h4() {
    this.wrap('h4');
  }

  h5() {
    this.wrap('h5');
  }

  h6() {
    this.wrap('h6');
  }

  quote() {
    this.wrap('blockquote');
  }

  hr() {
    this.insert('hr');
  }

  bulletList() {
    this.wrapList('ul');
  }

  numberList() {
    this.wrapList('ol');
  }

  openLinkDialog(url = '') {
    this.saveSelection();
    // TODO: append dialog in comp name (my standard)
    const dialogRef = this.dialog.open(LinkComponent);
    dialogRef.componentInstance.url = url;

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result !== null) {
        if (result.name !== '' && result.url !== '') {
          this.restoreSelection();
          this.insertLink(result.name, result.url);
        }
      }
    });
  }

  openMentionDialog() {
    this.saveSelection();
    // TODO: append dialog in comp name (my standard)
    const dialogRef = this.dialog.open(MentionComponent);

    dialogRef.afterClosed().subscribe((result: Mention) => {
      if (result !== undefined && result !== null && result.hierarchy !== '') {
        this.restoreSelection();
        // CONTINUE!!!
        this.insertMention(result.hierarchy);
      }
    });
  }

  openImageDialog() {
    // TODO: append dialog in comp name (my standard)
    this.dialog.open(ImageComponent);
  }

  saveChanges() {
    this.onSave.emit(this.box.innerHTML);
  }
}
