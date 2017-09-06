import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-markdown-helper-dialog',
  templateUrl: './markdown-helper-dialog.component.html',
  styleUrls: ['./markdown-helper-dialog.component.scss']
})
export class MarkdownHelperDialogComponent implements OnInit {

  @Input() markdownHelperType: MarkdownHelperType;
  @Input() input = '';
  markdownHelperTypeEnum = MarkdownHelperType;
  form: FormGroup;
  http = 'http://';
  https = 'https://';

  imgUrlWarning: boolean;

  constructor(public dialogRef: MdDialogRef<MarkdownHelperDialogComponent>,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    let defaultHost = this.http;
    if (this.input.startsWith(this.http)) {
      this.input = this.input.substring(7, this.input.length);
    }
    if (this.input.startsWith(this.https)) {
      defaultHost = this.https;
      this.input = this.input.substring(8, this.input.length);
    }

    this.form = this.fb.group({
      imageUrl: this.input,
      imageAltText: '',

      youtubeId: '',
      youtubeAltText: '',

      linkName: this.input,
      linkHost: defaultHost,
      linkUrl: '',

      mailtoName: this.input,
      mailtoUrl: '',

      imgLinkAltText: '',
      imgLinkHost: defaultHost,
      imgLinkUrl: this.input,
      imgLinkImgUrl: ''
    });

    this.form.get('imageUrl').valueChanges.subscribe(value => this.preventHttpImage(value, 'imageUrl'));
    this.form.get('linkUrl').valueChanges.subscribe(value => this.autoSelectHttpHost(value, 'linkUrl', 'linkHost'));
    this.form.get('imgLinkUrl').valueChanges.subscribe(value => this.autoSelectHttpHost(value, 'imgLinkUrl', 'imgLinkHost'));
    this.form.get('imgLinkImgUrl').valueChanges.subscribe(value => this.preventHttpImage(value, 'imgLinkImgUrl'));
  }

  preventHttpImage(value: string, urlFieldName: string) {
    if (value.startsWith(this.http)) {
      this.imgUrlWarning = true;
      this.form.get(urlFieldName).setValue('', { emitEvent: false });
    } else {
      this.imgUrlWarning = false;
    }
  }

  autoSelectHttpHost(value: string, urlFieldName: string, hostFieldName: string) {
    if (value.startsWith(this.http)) {
      this.form.get(urlFieldName).setValue(value.substring(7, value.length));
      this.form.get(hostFieldName).setValue(this.http);
    }
    if (value.startsWith(this.https)) {
      this.form.get(urlFieldName).setValue(value.substring(8, value.length));
      this.form.get(hostFieldName).setValue(this.https);
    }
  }

  add() {
    switch (this.markdownHelperType) {
      case MarkdownHelperType.image:
        const defaultimageAltText = this.form.get('imageAltText').value === '' ? 'Image' : this.form.get('imageAltText').value;
        this.dialogRef.close(`\n![${defaultimageAltText}](https://${this.form.get('imageUrl').value})`);
        break;
      case MarkdownHelperType.youtube:
        const defaultYoutTubeAltText = this.form.get('youtubeAltText').value === '' ? 'YouTube video' : this.form.get('youtubeAltText').value;
        this.dialogRef.close(`\n[![${defaultYoutTubeAltText}](https://img.youtube.com/vi/${this.form.get('youtubeId').value}/0.jpg)](https://www.youtube.com/watch?v=${this.form.get('youtubeId').value})`);
        break;
      case MarkdownHelperType.link:
        this.dialogRef.close(`[${this.form.get('linkName').value}](${this.form.get('linkHost').value + this.form.get('linkUrl').value})`);
        break;
      case MarkdownHelperType.mailto:
        this.dialogRef.close(`[${this.form.get('mailtoName').value}](mailto:${this.form.get('mailtoUrl').value})`);
        break;
      case MarkdownHelperType.imgLink:
        const defaultImgLinkAltText = this.form.get('imgLinkAltText').value === '' ? 'Image' : this.form.get('imgLinkAltText').value;
        this.dialogRef.close(`\n[![${defaultImgLinkAltText}](https://${this.form.get('imgLinkImgUrl').value})](${this.form.get('imgLinkHost').value + this.form.get('imgLinkUrl').value})`);
        break;

      default:
        break;
    }
  }
}

export enum MarkdownHelperType {
  image = 1,
  youtube = 2,
  vimeo = 3,
  link = 4,
  imgLink = 5,
  mailto = 6
}
