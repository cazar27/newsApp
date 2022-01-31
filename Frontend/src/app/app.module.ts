import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LOCALE_ID } from '@angular/core';
import { DatePipe, DecimalPipe, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { RouterModule } from '@angular/router';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "es" },
    { provide: MAT_DATE_LOCALE, useValue: 'es' },

    DatePipe,
    DecimalPipe
  ],
  bootstrap: [AppComponent],
  exports: [
    SharedModule
  ]
})
export class AppModule { }
