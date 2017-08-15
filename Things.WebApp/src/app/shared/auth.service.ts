import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { RequestResult } from "./RequestResult";

@Injectable()
export class AuthService implements CanActivate {
    private tokeyKey = 'token';

    private logedInUserId = new BehaviorSubject<number>(this.getIdFromJWT());
    logedInUserId$ = this.logedInUserId.asObservable();

    constructor(private http: Http, private router: Router) { }

    public authGet$(url) {
        const headers = this.initAuthHeaders();
        const options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map(
            response => response.json()
        ).catch(this.handleError);
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.checkLogin()) {
            return true;
        } else {
            this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
            return false;
        }
    }

    private getIdFromJWT() {
        const token = this.getLocalToken();
        if (token !== null) {
            const parsedToken = this.parseJwt(token);
            const id = parsedToken['ID'];
            if (id !== null && id !== undefined) {
                return +id;
            }
        }
        return null;
    }

    parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        try {
            return JSON.parse(window.atob(base64));
        } catch (e) {
            console.error('problem with token parsing');
            return null;
        }
    };

    public updateLogedInUserId(value) {
        this.logedInUserId.next(value);
    }

    public getLogedInUserId(): number {
        return this.logedInUserId.getValue();
    }

    public setToken(accessToken: string, thingId: number) {
        sessionStorage.setItem(this.tokeyKey, accessToken);
        this.updateLogedInUserId(thingId);
    }

    public removeToken() {
        sessionStorage.clear();
        this.updateLogedInUserId(null);
        this.router.navigate(['login'], { queryParams: { returnUrl: this.router.url }});
    }

    public checkLogin(): boolean {
        const token = sessionStorage.getItem(this.tokeyKey);
        return token != null;
    }

    private getLocalToken(): string {
        return sessionStorage.getItem(this.tokeyKey);
    }

    private initAuthHeaders(): Headers {
        const token = this.getLocalToken();
        if (token == null) {
            throw new Error('No token');
        }

        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + token);
        return headers;
    }

    private handleError(error: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}


// import { Injectable } from '@angular/core';
// import { BaseService } from './base.service';
// import { ThingsApi } from './../api-assets/bundle';

// // Service to handle platform specific authentication
// @Injectable()
// export class AuthenticationService extends BaseService {

//   authCookieName = 'thingsauth';
//   isAuthenticated: boolean = false;
//   currentUser: ThingsApi.Repository.ServiceModels.User.TokenServiceModel;

//   constructor() {
//     super();
//   }

//   public getCurrentUser() {
//     if (this.currentUser != null) {
//       this.isAuthenticated = true;
//       return this.currentUser;
//     } else {
//       this.logger('Current user is null');
//       return null;
//     }
//   }

//   // Cookies
//   getToken(): string {
//     let ca: Array<string> = document.cookie.split(';');
//     let caLen: number = ca.length;
//     let cookieName = this.authCookieName + '=';
//     let c: string;

//     for (let i = 0; i < caLen; i += 1) {
//       c = ca[i].replace(/^\s/g, '');
//       if (c.indexOf(cookieName) === 0) {
//         return c.substring(cookieName.length, c.length);
//       }
//     }
//     return '';
//   }

//   public deleteToken() {
//     this.setCookie(this.authCookieName, '', -1);
//     this.isAuthenticated = false;
//   }

//   public setCookie(name: string, value: string, expireDays: number, path = '') {
//     let d: Date = new Date();
//     d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
//     let expires = `expires=${d.toUTCString()}`;
//     const token = name + '=' + value + '; ' + expires + (path.length > 0 ? '; path=' + path : '');
//     document.cookie = token;
//   }

//   public setToken(token: string) {
//     this.setCookie(this.authCookieName, token, 1);
//     this.isAuthenticated = true;
//   }

//   public hasToken(): boolean {
//     const cookieTokenValue = this.getToken();

//     if (cookieTokenValue.length > 0) {
//       return true;
//     } else {
//       return false;
//     }
//   }
// }
