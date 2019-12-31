import { Page } from 'src/app/shared/view-models/page.model';
import { Component, OnInit } from '@angular/core';
import { AgreementService } from '../../agreement/agreement.service';
import { AgreementViewModel } from '../../agreement/agreement.model';
import { ActivatedRoute } from '@angular/router';

@Component( {
  selector: 'app-agreements',
  templateUrl: './agreements.component.html',
  styleUrls: ['./agreements.component.css']
} )
export class AgreementsComponent implements OnInit {
  page: Page = new Page();
  item: AgreementViewModel = new AgreementViewModel();
  constructor(
    private _agreementService: AgreementService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( params => {
      if ( params.has( 'id' ) ) {
        this.item.RequestID = +params.get( 'id' );
      }
      // alert( "here" )
      this.page.isLoading = true;
      this._agreementService.getById( this.item.RequestID ).subscribe( response => {
        if ( response.Success ) {
          this.item = response.Data;
          this.page.isLoading = false;
          if ( this.item.StaffSignedAggrementFilePath == null )
            this.item.StaffSignedAggrementFilePath = "";
          if ( this.item.ConsumerSignedAggrementFilePath == null )
            this.item.ConsumerSignedAggrementFilePath = "";
        }
      }, null, () => {
        this.page.isPageLoaded = true;
      } );
    } );
  }

}
