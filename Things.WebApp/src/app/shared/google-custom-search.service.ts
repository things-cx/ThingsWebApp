import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';

@Injectable()
export class GoogleCustomSearchService {

  googleCustomSearchUrlEndpoint = environment.googleCustomSearchUrlEndpoint;

  constructor(private http: Http) { }

  search(term: string, page: number) {
    const searchUrl = this.googleCustomSearchUrlEndpoint
      .replace('[PAGE_START]', page.toString())
      .replace('[SEARCH_TERM]', term);

    return this.http.get(searchUrl);
  }
}
