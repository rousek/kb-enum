import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { takeWhile } from "rxjs";
import { AVAILABLE_LOCALES, Locale } from "src/app/i18n";
import { StorageService } from "src/app/providers/storage/storage.service";

/**
 * Lets you change language by displaying dropdown menu with flags on click.
 */
@Component({
  selector: 'app-language-button',
  template: `
  <button mat-button [matMenuTriggerFor]="menu">
    <app-flag [code]="currentLocale.countryCode"></app-flag>
  </button>
  <mat-menu #menu="matMenu" class="flag-menu">
    <button mat-menu-item *ngFor="let locale of otherLocales" (click)="select(locale)">
      <app-flag [code]="locale.countryCode"></app-flag>
    </button>
  </mat-menu>
  `,
  styles: [`
    app-flag {
      font-size: 24px;
    }
  `]
})
export class LanguageButtonComponent {
  private destroyed = false;

  currentLocale = AVAILABLE_LOCALES[0];
  otherLocales = AVAILABLE_LOCALES.slice(1);

  constructor(private t: TranslateService, private s: StorageService) {}

  ngOnInit() {
    this.t.onLangChange.pipe(takeWhile(() => !this.destroyed))
    .subscribe(lang => {
      let locale = AVAILABLE_LOCALES.find(l => l.langCode === lang.lang.toLowerCase());
      if (!locale) {
        console.warn(`Locale ${lang.lang} not found!`);
      } else {
        this.setLocales(locale);
      }
    });
  }

  ngOnDestroy() {
    this.destroyed = true;
  }

  select(locale: Locale) {
    this.s.set('lang', locale.langCode);
    this.setLocales(locale);
  }

  private setLocales(current: Locale) {
    this.currentLocale = current;
    this.otherLocales = AVAILABLE_LOCALES.filter(l => l !== current);
  }
}
