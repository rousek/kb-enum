import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/providers/alert/alert.service';
import { AuthenticationService } from 'src/app/providers/authentication/authentication.service';

/**
 * Simple page with login form.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });

  constructor(
    private authService: AuthenticationService,
    private t: TranslateService,
    private alertService: AlertService,
    private router: Router) {}


  login() {
    const username = this.loginForm.get('username')!.value!;
    const password = this.loginForm.get('password')!.value!;

    const observer = {
      next: () => this.onLoginSuccess(),
      error: (error: any) => this.onLoginError(error)
    };

    this.authService.login({username, password}).subscribe(observer);
  }

  private onLoginSuccess() {
    this.router.navigate(['/enums']);
  }

  private onLoginError(error: HttpErrorResponse) {
    // 401 is special here, other codes are the same
    if (error instanceof HttpErrorResponse && error.status === 401) {
      return this.alertService.error(this.t.instant('INVALID_CREDENTIALS')).subscribe();
    }
    return this.alertService.httpError(error).subscribe();
  }
}
/*
@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
    animations: [
        trigger('loginErrors', [
          state('hidden', style({ height: '0px', visibility: 'hidden' })),
          state('visible', style({ height: '*', visibility: 'visible' })),
          transition(
            'hidden <=> visible',
            animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
          ),
        ]),
    ],

})
*/
