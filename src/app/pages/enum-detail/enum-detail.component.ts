import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, takeWhile } from 'rxjs';
import { DEFAULT_LOCALE } from 'src/app/i18n';
import { AlertService } from 'src/app/providers/alert/alert.service';
import { EnumInt, GetSingleEnumParamsInt } from 'src/app/providers/enum/enum-ints';
import { EnumService } from 'src/app/providers/enum/enum.service';

/**
 * Component to be displayed in nested navigation to show info about particular enum.
 */
@Component({
  selector: 'app-enum-detail',
  templateUrl: './enum-detail.component.html',
  styleUrls: ['./enum-detail.component.scss']
})
export class EnumDetailComponent {
  private destroyed = false;

  protected enumName: string = '';
  protected enum = new BehaviorSubject<EnumInt | null>(null);
  protected loading = new BehaviorSubject<boolean>(true);
  protected reqParams: GetSingleEnumParamsInt = {
    order: 'ascending',
    orderBy: 'name',
    //@ts-ignore
    lang: DEFAULT_LOCALE.langCode,
    additionalInfo: true
  };

  protected readonly orderBys = [
    {
      value: 'code',
      label: 'CODE'
    },
    {
      value: 'name',
      label: 'NAME'
    },
    {
      value: 'description',
      label: 'DESCRIPTION'
    }
  ];
  protected readonly orders = [
    {
      value: 'ascending',
      label: 'ASCENDING'
    },
    {
      value: 'descending',
      label: 'DESCENDING'
    }
  ];

  constructor(
    private enumService: EnumService,
    private route: ActivatedRoute,
    private t: TranslateService,
    private alertService: AlertService) {}

  ngOnInit() {
    this.route.params.pipe(takeWhile(() => !this.destroyed))
    .subscribe(params => {
      this.enumName = params['enumName'] || '';
      this.reload();
    });

    //@ts-ignore
    this.reqParams.lang = this.t.currentLang;

    this.t.onLangChange.pipe(takeWhile(() => !this.destroyed))
    .subscribe(lang => {
      //@ts-ignore
      this.reqParams.lang = lang.lang;
    });
  }

  ngOnDestroy() {
    this.destroyed = true;
    this.loading.complete();
    this.enum.complete();
  }

  reload() {
    this.enum.next(null);

    if (!this.enumName) {
      return;
    }
    this.loading.next(true);

    const observer = {
      next: (e: EnumInt) => {
        this.enum.next(e);
      },
      error: (e: any) => {
        console.error(e);
        if (e instanceof HttpErrorResponse) {
          this.alertService.httpError(e).subscribe();
        } else {
          this.alertService.error(this.t.instant('UNKNOWN_ERROR')).subscribe();
        }
      },
      complete: () => {
        this.loading.next(false);
      }
    }

    this.enumService.get(this.enumName, this.reqParams)
    .pipe(takeWhile(() => !this.destroyed))
    .subscribe(observer);
  }

  parseDate(str: string) {
    return new Date(str);
  }

  parseObj(obj: { [key: string]: string }) {
    return Object.keys(obj).map(key => ({key, value: obj[key]}));
  }
}
