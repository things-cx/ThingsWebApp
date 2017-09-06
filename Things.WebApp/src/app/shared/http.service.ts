import { Injectable } from '@angular/core';
import { Response, ResponseType, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { LoggingService } from './logging.service';
import { AuthService } from './auth.service';

@Injectable()
export class HttpService {

  apiUrl = environment.apiUrlEndpoint;
  private tokeyKey = 'token';

  constructor(private router: Router,
    private authService: AuthService) { }

  getBodyWithStatusCode(res: Response): any {
    const statusCode = res.status;
    if (statusCode >= 200 && statusCode < 300) { // Success
      if (statusCode === 200) { // Ok

        return this.getBody(res);

      } else if (statusCode === 201) { // Created

        return this.getBody(res);

      } else if (statusCode === 204) { // No Content
      } else {
      }
    } else if (statusCode >= 300 && statusCode < 400) { // Redirection
      if (statusCode === 304) { // Not modified
      }
    } else if (statusCode >= 400 && statusCode < 500) { // Client error
      if (statusCode === 400) { // Bad Request

        if (!environment.production) {
          console.error(res);
        }
        return Observable.throw(this.buildValidationModel(res));

      } else if (statusCode === 401) { // Unauthorized

        // This will redirect to the login page
        this.authService.removeToken();

      } else if (statusCode === 403) { // Forbidden
      } else if (statusCode === 404) { // Not Found

        if (!environment.production) {
          console.error(res);
        }
        return Observable.throw(this.buildValidationModel(res));

      } else if (statusCode === 409) { // Conflict
      } else if (statusCode === 422) { // Unprocessable Entity
      } else {
      }

    } else if (statusCode >= 500 && statusCode < 600) { // Client error
      if (statusCode === 500) { // Internal Server Error
      }
    } else if (statusCode === 0) { // Assume no connection to the api
      console.error('API is offline');
    }


    return Observable.throw(res);
  }

  private buildValidationModel(res: Response): ValidationModel[] {
    const body = this.getBody(res) as Object;
    const validationErrors = new Array<ValidationModel>();
    for (const property in body) {
      if (body.hasOwnProperty(property)) {
        const validationModel = new ValidationModel;
        validationModel.key = property.toLowerCase();
        validationModel.errors = body[property];
        validationErrors.push(validationModel);
      }
    }
    return Object.assign(Array<ValidationModel>(), validationErrors);
  }

  private getLocalToken(): string {
    return sessionStorage.getItem(this.tokeyKey);
  }

  addAuthHeaders(headers: Headers) {
    const token = this.getLocalToken();
    if (token !== null) {
      headers.append('Authorization', 'Bearer ' + token);
      return headers;
    }
  }

  private getBody(res: Response) {
    try {
      return res.json();
    } catch (error) {
      return res;
    }
  }

  public extractData(res: Response) {
    return this.getBodyWithStatusCode(res);
  }

  public handleError(error: Response | any): ErrorObservable {
    return this.getBodyWithStatusCode(error);
  }

  logError(error: Response) {
    // TODO: add remote logging service (time of writing angular doesn't have built in logging servie)
    // ** IT doesn't work because I can't reference the Things models in the api bundle for some reason
    // Built my own but then it needs to be bootstrapped
    // this.logger.log(Things.Api.Models.LogLevel.error, message);

    if (!environment.production) {
      console.error(error.statusText);
    }
  }
}

export class ValidationModel {
  key: string;
  errors: string[];
}
