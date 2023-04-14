import { registerLocaleData } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from './i18n';
import { AuthenticationService } from './providers/authentication/authentication.service';
import { StorageService } from './providers/storage/storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kb-enum';

  constructor(
    private t: TranslateService,
    private s: StorageService,
    private auth: AuthenticationService) {}

  get isAuthenticated() { return this.auth.isAuthenticated; };


  ngOnInit() {
    this.initTranslate();
    this.initAuth();
  }

  logout() {
    this.auth.logout();
  }

  private initAuth() {
    this.auth.retrieve();
  }

  private initTranslate() {
    // Register locales for dates
    AVAILABLE_LOCALES.forEach(l => {
      registerLocaleData(l.locale, l.langCode);
    });

    const browserLang = this.t.getBrowserLang();

    // Set to browser or default language
    if (browserLang && AVAILABLE_LOCALES.find(l => l.langCode === browserLang)) {
      console.log('setting browser lang', browserLang);
      this.t.use(browserLang);
    } else {
      console.log('browser lang unknown', browserLang);
      this.t.use(DEFAULT_LOCALE.langCode);
    }

    // No need to unsubscribe since this is root component
    // It will never be destroyed
    this.s.watch('lang').subscribe(savedLang => {
      if (savedLang && AVAILABLE_LOCALES.find(l => l.langCode === savedLang)) {
        this.t.use(savedLang);
      }
    });
  }

}
