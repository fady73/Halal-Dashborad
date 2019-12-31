import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from 'src/app/shared/view-models/page.model';
import { DecisionCommitte } from '../../audit-plan/decision-committe';
import { CommitteeDecisionService } from '../../audit-plan/committee-decision.service';
@Component( {
  selector: 'app-comittee',
  templateUrl: './comittee.component.html'
} )
export class ComitteeComponent implements OnInit {

  page: Page = new Page();
  item: DecisionCommitte = new DecisionCommitte();
  RequestID: number;
  hasData: boolean = false;
  private showUploadFile: boolean = false;

  constructor(
    private _committeDesisionService: CommitteeDecisionService,
    private activatedRoute: ActivatedRoute, private _router: Router,
  ) { }

  ngOnInit() {
    this.initializePage();
  }
  initializePage() {
    this.activatedRoute.paramMap.subscribe( params => {
      if ( params.has( 'id' ) ) {
        this.RequestID = +params.get( 'id' );
      }
      this.page.isLoading = true;
      this._committeDesisionService.GetCommitteeDecisionByRequestID( this.RequestID ).subscribe( response => {
        if ( response.Success ) {
          if ( response.Data.Result.length > 0 )
            {
              this.item = response.Data.Result[0];
              this.hasData = true;
            }
          else
            this.hasData = false;
          this.page.isLoading = false;
        }

      }, null, () => {
        this.page.isPageLoaded = true;
      } );
    } );

  }

}
