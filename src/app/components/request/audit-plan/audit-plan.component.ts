import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuditPlanService } from '../../audit-plan/audit-plan.service';
import { AuditPlanViewModel } from '../../audit-plan/audit-plan.model';
import { forkJoin } from 'rxjs';
import { DecisionCommitte } from '../../audit-plan/decision-committe';
import { CommitteeDecisionService } from '../../audit-plan/committee-decision.service';
import { RequestService } from '../request.service';
import { RequestViewModel } from '../request.model';

@Component( {
  selector: 'app-audit-plan',
  templateUrl: './audit-plan.component.html',
  styleUrls: ['./audit-plan.component.css']
} )
export class AuditPlanComponent implements OnInit {
  item: AuditPlanViewModel = new AuditPlanViewModel();
  auditReport: DecisionCommitte = new DecisionCommitte();
  requestID: number;
  selectedItem: RequestViewModel = new RequestViewModel();

  constructor(
    private activatedRoute: ActivatedRoute,
    private _auditPlanService: AuditPlanService,
    private _committeDesisionService: CommitteeDecisionService,
    private RequestService:RequestService
  ) { }

  ngOnInit() {
    this.initializePage();
  }

  initializePage() {
    this.activatedRoute.paramMap.subscribe( params => {
      if ( params.has( 'id' ) ) {
        this.requestID = +params.get( 'id' );
      }
      forkJoin( [
        this._committeDesisionService.GetCommitteeDecisionByRequestID( this.requestID ),
        this._auditPlanService.getByRequestID( this.requestID ),
        this.RequestService.getByID(this.requestID)
      ] ).subscribe( res => {
        if ( res[0].Data.Result.length > 0 )
          this.auditReport = res[0].Data.Result[0];
        this.item = res[1].Data;
        this.selectedItem=res[2].Data;
      }
      );
    } );

  }
}
