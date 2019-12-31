import { Page } from 'src/app/shared/view-models/page.model';
import { CertificateService } from './../../certificate/certificate.service';
import { CertificateSearchViewModel } from './../../certificate/certificate-search.model';
import { Component, OnInit } from '@angular/core';
import { CertificateViewModel } from '../../certificate/certificate.model';
import { ActivatedRoute } from '@angular/router';

@Component( {
  selector: 'app-certifcate',
  templateUrl: './certifcate.component.html',
  styleUrls: ['./certifcate.component.css']
} )
export class CertifcateComponent implements OnInit {
  page: Page = new Page();
  searchViewModel: CertificateSearchViewModel = new CertificateSearchViewModel();
  item: CertificateViewModel = new CertificateViewModel();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _cerificateService: CertificateService
  ) { }

  ngOnInit() {
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
      if (  response.Data.Result.length > 0 ) {
        this.item = response.Data.Result[0];
      }
      
      this.page.isLoading = false;

    }, null, () => {
      this.page.isPageLoaded = true;
    } );
  }

}
