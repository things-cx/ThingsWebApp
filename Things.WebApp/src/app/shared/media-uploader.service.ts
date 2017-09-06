import { Injectable } from '@angular/core';
import { Http, Headers, Request } from '@angular/http';
import { Things } from 'api-typings/bundle';
import { HttpService } from './http.service';

@Injectable()
export class MediaUploaderService {

  constructor(private http: Http, private httpService: HttpService) {
  }

  uploadFile(file: File, mediaType: Things.Api.Models.BolbMediaType) {
    const formDate = new FormData();
    formDate.append('', file);
    formDate.append('mediaType', mediaType.toString());

    const headers = new Headers({
      'Content-Type': undefined,
      'Access-Control-Allow-Origin': '*'
    });

    const request = new Request({
      url: `${this.httpService.apiUrl}/api/media/uploadfile`,
      method: `post`,
      body: formDate
    });

    return this.http.request(request)
      .map(res => this.httpService.extractData(res))
      .catch(err => this.httpService.handleError(err));
  }
}
