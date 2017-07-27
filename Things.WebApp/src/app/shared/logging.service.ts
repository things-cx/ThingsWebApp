import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Things } from 'api-typings/bundle';

@Injectable()
export class LoggingService {

  constructor(private http: Http) { }

  initialize() {
    const trace = console.trace;
    const debug = console.log;
    const info = console.info;
    const warn = console.warn;
    const error = console.error;

    console.trace = function (message) {
      this.log(Things.Api.Models.LogLevel.trace, message);
      trace.call(this, arguments);
    };

    console.log = function (message) {
      this.log(Things.Api.Models.LogLevel.debug, message);
      debug.call(this, arguments);
    };

    console.info = function (message) {
      this.log(Things.Api.Models.LogLevel.information, message);
      info.call(this, arguments);
    };

    console.warn = function (message) {
      this.log(Things.Api.Models.LogLevel.warning, message);
      warn.call(this, arguments);
    };

    console.error = function (message) {
      this.log(Things.Api.Models.LogLevel.error, message);
      error.call(this, arguments);
    };

    window.onerror = function (message, location, lineNumber) {
      console.error(`${message} Location: ${location} Line Number ${lineNumber}`);
    };
  }

  public log(level: Things.Api.Models.LogLevel, message: string) {
    this.http.post('api/log', { level: level, message: message });
  }
}
