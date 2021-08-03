import { HttpLoggerService } from './auth/http-logger.service';
import { HttpErrorHandlerService } from './auth/http-error-handler.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { MatConfirmDialogComponent } from './shared/mat-confirm-dialog/mat-confirm-dialog.component';
import { LoginComponent } from './_components/login/login.component';
import { ShellComponent } from './_components/shell/shell.component';
import { UserComponent } from './_components/user/user.component';
import { ClientPersonalFormComponent } from './_forms/client-personal-form/client-personal-form.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { ClientSocialFormComponent } from './_forms/client-social-form/client-social-form.component';
import { ShowprofileComponent } from './_components/showprofile/showprofile.component';

@NgModule({
  declarations: [
    AppComponent,
    MatConfirmDialogComponent,
    LoginComponent,
    ShellComponent,
    UserComponent,
    ClientPersonalFormComponent,
    LoaderComponent,
    ClientSocialFormComponent,
    ShowprofileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorHandlerService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoggerService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
