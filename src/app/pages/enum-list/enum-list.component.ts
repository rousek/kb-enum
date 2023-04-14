import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, takeWhile } from 'rxjs';
import { AlertService } from 'src/app/providers/alert/alert.service';
import { EnumInt } from 'src/app/providers/enum/enum-ints';
import { EnumService } from 'src/app/providers/enum/enum.service';

/**
 * Page that shows list of enums and has nested navigation for enum detail.
 */
@Component({
  selector: 'app-enum-list',
  templateUrl: './enum-list.component.html',
  styleUrls: ['./enum-list.component.scss']
})
export class EnumListComponent {
  allEnums = new BehaviorSubject<EnumInt[] | null>(null);
  loading = new BehaviorSubject<boolean>(false);

  private destroyed = false;

  constructor(
    private enumService: EnumService,
    private alertService: AlertService,
    private t: TranslateService) {

  }

  ngOnInit() {
    this.reload();
  }

  ngOnDestroy() {
    this.destroyed = true;
    this.loading.complete();
    this.allEnums.complete();
  }

  reload() {
    const observer = {
      next: (all: EnumInt[]) => {
        this.allEnums.next(all);
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

    this.allEnums.next(null);
    this.loading.next(true);
    this.enumService.getAll().pipe(takeWhile(() => !this.destroyed)).subscribe(observer);
  }
}
