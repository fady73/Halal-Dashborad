import { AlertComponent } from './../../components/alert/alert.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxPaginationModule } from 'ngx-pagination';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';
import { LocalizationService } from '../services/localization.service';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgSelectModule } from '@ng-select/ng-select';
import { ShippingTabComponent } from '../../components/shared/tab/tab.component';
import { RouterModule } from '@angular/router';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule, ModalModule, BsModalService } from 'ngx-bootstrap';
import { HotkeyModule } from 'angular2-hotkeys';
import { ChartModule } from 'angular-highcharts';
import { NgxDropzoneModule } from 'ngx-dropzone';
export function HttpLoaderFactory( http: HttpClient ) {
  return new TranslateHttpLoader( http, 'assets/i18n/', '.json' );
}

@NgModule( {

  imports: [
    CommonModule,
    HotkeyModule.forRoot(),
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
    ChartModule,
    RouterModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    DatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
    ConfirmationPopoverModule.forRoot( {
      confirmButtonType: 'danger' // set defaults here
    } ),
    CKEditorModule,
    TranslateModule.forChild( {
      loader: {
        provide: TranslateLoader,
        useFactory: ( HttpLoaderFactory ),
        deps: [HttpClient]
      }, isolate: true
    } )
  ],
  exports: [ReactiveFormsModule, CommonModule, SimpleNotificationsModule,
    FormsModule, CKEditorModule, NgSelectModule,
    NgxPaginationModule, HttpClientModule, TranslateModule,NgxDropzoneModule,
    ChartModule, BsDatepickerModule, ModalModule, DatepickerModule, TimepickerModule,
    ConfirmationPopoverModule, HotkeyModule, AlertComponent, ShippingTabComponent
  ]
  , providers: [NotificationsService]
  ,
  entryComponents: [],
  declarations: [AlertComponent, ShippingTabComponent],

} )
export class SharedModule {
  constructor( private translate: TranslateService, private localizationService: LocalizationService ) {
    this.translate.use( localizationService.getLanguage() );
  }
}
