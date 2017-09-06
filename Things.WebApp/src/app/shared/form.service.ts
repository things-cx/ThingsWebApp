import { Injectable } from '@angular/core';
import { ValidationModel } from './http.service';

@Injectable()
export class FormService {

  constructor() { }

  public showServerErrors(errors: ValidationModel[]) {
    const formErrors = {};

    for (const error of errors) {
      formErrors[error.key] = '';

      for (const message of error.errors) {
        formErrors[error.key] += message + ' ';
      }
    }

    return formErrors;
  }
}
