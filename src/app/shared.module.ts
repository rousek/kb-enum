import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnumService } from './providers/enum/enum.service';
import { StorageService } from './providers/storage/storage.service';
import { FlagComponent } from './components/flag/flag.component';
import { LanguageButtonComponent } from './components/language-button/language-button.component';
import { LocalizedDatePipe } from './pipes/localized-date.pipe';
import { ErrorAlertComponent } from './components/error-alert/error-alert.component';
import { AlertService } from './providers/alert/alert.service';
import { AuthenticationService } from './providers/authentication/authentication.service';
import { AuthGuard } from './guards/auth.guard';

const SHARED_MODULES = [
  CommonModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  TranslateModule,

  // Material modules
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatSelectModule,
  MatCheckboxModule,
  ScrollingModule,
  MatMenuModule,
  MatDialogModule,
  MatInputModule,
  MatIconModule
]

const SHARED_COMPONENTS = [
  FlagComponent,
  LanguageButtonComponent,
  LocalizedDatePipe,
  ErrorAlertComponent
]

/**
 * Module for all the common components and mainly Material modules.
 */
@NgModule({
  declarations: SHARED_COMPONENTS,
  imports: SHARED_MODULES,
  exports: [
    ...SHARED_MODULES,
    ...SHARED_COMPONENTS
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        EnumService,
        StorageService,
        AlertService,
        AuthenticationService,
        AuthGuard
      ]
    }
  }
}
