import localeEnglish from '@angular/common/locales/en';
import localeCzech from '@angular/common/locales/cs';

export interface Locale {
  langCode: string,
  countryCode: string,
  locale: any
};

export const AVAILABLE_LOCALES: Locale[] = [
  {
    langCode: 'cs',
    countryCode: 'CZ',
    locale: localeCzech
  },
  {
    langCode: 'en',
    countryCode: 'US',
    locale: localeEnglish
  }
];

export const DEFAULT_LOCALE = AVAILABLE_LOCALES[0];
