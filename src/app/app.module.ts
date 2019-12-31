import { LayoutComponent } from './components/shared/layout/layout.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/modules/shared.module';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { BsModalService } from 'ngx-bootstrap';






export function HttpLoaderFactory( http: HttpClient ) {
  return new TranslateHttpLoader( http, 'assets/i18n/', '.json' );
}

@NgModule( {
  declarations: [
    AppComponent, LayoutComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule, AppRoutingModule, SharedModule, HttpClientModule, FormsModule,
    TranslateModule.forRoot( {
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    } ),

    NgProgressModule.withConfig( {
      direction: "ltr+",
      spinnerPosition: 'right',
      color: '#1ab394'
    } ),
    NgProgressHttpModule
    , BrowserAnimationsModule
  ],
  providers: [TranslateService],
  bootstrap: [AppComponent]
} )
export class AppModule { }
