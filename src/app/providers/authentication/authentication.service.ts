import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, delay, map, of, tap, throwError } from "rxjs";
import { StorageService } from "../storage/storage.service";
import { LoginParamsInt, LoginRespInt } from "./auth-int";

// 1 hour validity
// Change to like 10 seconds to see that logout watchdog works.
// This is fake. Normally server states the validity.
const TOKEN_VALIDITY = 3600 * 1000;

/**
 * Implements login and logout and watchdog to transfer you to login screen when token expires.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private tokenSubj = new BehaviorSubject<LoginRespInt | null>(null);
  private logoutTimeout: any | null = null;

  isAuthenticated = this.tokenSubj.asObservable().pipe(map(resp => resp && resp.tokenExp > Date.now()));

  constructor(
    private http: HttpClient,
    private s: StorageService,
    private router: Router) {}

  get token() { return this.tokenSubj.getValue()?.token; }
  get tokenExp() { return this.tokenSubj.getValue()?.tokenExp; }

  get isAuthenticatedSync() {
    const exp = this.tokenExp;
    return exp !== undefined && exp > Date.now();
  }

  retrieve() {
    const fromStorage = this.s.get('auth');
    if (fromStorage) {
      this.processLogin(fromStorage);
    }
  }

  login(params: LoginParamsInt) {
    return this.mockLogin(params).pipe(tap(r => this.processLogin(r)));
  }

  logout() {
    this.clearLogoutTimeout();
    this.tokenSubj.next(null);
    this.s.clear('auth');
    this.router.navigate(['/login']);
  }

  private processLogin(resp: LoginRespInt) {
    this.tokenSubj.next(resp);
    this.s.set('auth', resp);
    this.setLogoutTimeout(resp);
  }

  private setLogoutTimeout(resp: LoginRespInt) {
    this.clearLogoutTimeout();

    const delay = resp.tokenExp - Date.now();
    if (delay <= 0) {
      return;
    }

    this.logoutTimeout = setTimeout(() => {
      this.logoutTimeout = null;
      this.logout();
    }, delay);
  }

  private clearLogoutTimeout() {
    if (this.logoutTimeout !== null) {
      clearTimeout(this.logoutTimeout);
      this.logoutTimeout = null;
    }
  }

  // Fake http request
  private mockLogin(params: LoginParamsInt) {
    if (!params.username || !params.password) {
      return throwError(() => new HttpErrorResponse({
        status: 400,
        statusText: 'Bad request.'
      }))
    } else if (params.username !== params.password) {
      return throwError(() => new HttpErrorResponse({
        status: 401,
        statusText: 'Invalid login credentials.'
      }));
    } else {
      // Delay response by 10ms - 110ms to make it realistic
      const delayTime = Math.floor(Math.random() * 100 + 10)
      const response = {
        token: 'abc123',
        tokenExp: Date.now() + TOKEN_VALIDITY
      };

      return of(response).pipe(delay(delayTime));
    }
  }
}
