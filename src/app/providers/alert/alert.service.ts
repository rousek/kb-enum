import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { ErrorAlertComponent } from "src/app/components/error-alert/error-alert.component";

/**
 * Simple service to show dialogs (only errors in this case).
 */
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private dialog: MatDialog, private t: TranslateService) {}

  error(message: string, buttonText?: string): Observable<void> {
    const config: MatDialogConfig = {
      data: { message, buttonText },
      minWidth: '300px',
    };
    const dialog = this.dialog.open(ErrorAlertComponent, config);
    return dialog.afterClosed();
  }

  httpError(error: HttpErrorResponse) {
    switch(error.status) {
      case 0:
        return this.error(this.t.instant('NO_CONNECTION'));
      case 400:
        return this.error(this.t.instant('BAD_REQUEST'));
      case 500:
        return this.error(this.t.instant('SERVER_ERROR'));
    }
    return this.error(this.t.instant('UNKNOWN_HTTP_ERROR', { status: error.status, statusText: error.statusText }));
  }
}
