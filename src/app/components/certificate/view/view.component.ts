import { ActivatedRoute } from '@angular/router';
import { ColumnViewModel } from 'src/app/shared/view-models/column-view-model';
import { CompanyService } from './../../../shared/services/company.service';
import { CrudService } from 'src/app/shared/services/crud.service';
import { Page } from 'src/app/shared/view-models/page.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertService } from '../../alert/alert.service';
import { CityService } from '../../admin/city/city.service';
import { RequestService } from '../../request/request.service';
import { BsModalRef } from 'ngx-bootstrap';
import { SelectItem } from 'src/app/shared/view-models/select-view-model';
import { forkJoin } from 'rxjs';
import { CertificateViewModel } from '../../request/viewModels/certificate.model';
import { CertificateSearchViewModel } from '../certificate-search.model';
import { CertificateService } from '../certificate.service';
import * as moment from 'moment-timezone'; //.format('YYYY-MM-DDTHH:mm:ss')


@Component( {
  templateUrl: './view.component.html',
} )
export class ViewComponent implements OnInit {

  page: Page = new Page();
  searchViewModel: CertificateSearchViewModel = new CertificateSearchViewModel();
  item: CertificateViewModel = new CertificateViewModel();

  constructor( private _formBuilder: FormBuilder,
    private alertService: AlertService,
    private requestService: RequestService,
    private crud: CrudService,
    private _activatedRoute: ActivatedRoute,
    private _cerificateService: CertificateService ) { }

  ngOnInit() {
    this.page.columns = [
      { Name: "SubmissionDate", Title: "Submission date", Selectable: true, Sortable: true },
      { Name: "CompanyName", Title: "Company name", Selectable: true, Sortable: true },
      { Name: "CompanyCountry", Title: "Company country", Selectable: true, Sortable: true },
      { Name: "RequestType", Title: "Request type", Selectable: true, Sortable: true }
    ];
    this.initializePage();
  }

  initializePage() {
    this._activatedRoute.paramMap.subscribe( params => {
      if ( params.has( 'id' ) ) {
        this.item.RequestID = +params.get( 'id' );
      }
    } );
    this.page.isLoading = true;
    this._cerificateService.getByRequestID( this.item.RequestID ).subscribe( response => {
      if ( response.Success ) {
        this.item = response.Data.Result[0];
        this.page.isLoading = false;
      }

    }, null, () => {
      this.page.isPageLoaded = true;
    } );
  }


}

