// import { Headers } from '@angular/http';
// import { BaseHttpService } from './base-http.service';
// import { AuthenticationService } from './auth.service';

// // All services making http requests that should be authenticated should extend this class
// export class AuthorizeBaseHttpService extends BaseHttpService {

//   headers: Headers;
//   authToken: string;

//   constructor(private authService: AuthenticationService) {
//     super();

//     this.authToken = this.authService.getToken();

//     if (this.authToken.length > 0 && typeof this.authToken !== 'undefined') {
//       this.headers = new Headers({
//         'Content-Type': 'application/json',
//         'Authorization': this.authToken,
//         'Access-Control-Allow-Origin': '*'
//       });
//     } else {
//       console.log('Error retrieving auth token from cookie.');
//       // this.deleteCookie(this.authCookieName);
//       // Navigate to login page
//       // this.router.navigate(['/login']);
//       console.log('no authorization token cookie for things');
//     }
//   }
// }
