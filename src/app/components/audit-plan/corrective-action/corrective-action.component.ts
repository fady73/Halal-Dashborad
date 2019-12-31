import { CrudService } from './../../../shared/services/crud.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment-timezone'; //.format('YYYY-MM-DDTHH:mm:ss')
import { AuditPlanViewModel } from '../../audit-plan/audit-plan.model';
import { AuditPlanService } from '../../audit-plan/audit-plan.service';
import { NcrService } from './ncr.service';
import { NCRViewModel } from './ncr.model';

@Component( {
  templateUrl: './corrective-action.component.html',
} )
export class CorrectiveActionComponent implements OnInit {
  isPageLoaded: boolean = false;
  model: NCRViewModel = new NCRViewModel();
  RequestID: number = 0
  auditPlan: AuditPlanViewModel = new AuditPlanViewModel();
  constructor( private _NcrService: NcrService,
    private _crudService: CrudService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {

  }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe( params => {
      this.model.RequestID = +params.get( 'id' );
      this.RequestID = this.model.RequestID;
      this.getByRequestID( this.model.RequestID );
    } );
  }

  getByRequestID( id: number ) {
    this._NcrService.getByRequestID( this.model.RequestID ).subscribe( response => {
      this.model = response.Data;

      if ( !this.model.NCSs )
        this.model.NCSs = [];
      this.model.NCSs.forEach( item => {
        item.CABAcceptance = false;
        //item.ImplementationPeriod=new Date();
        item.ImplementationPeriod = moment( new Date() ).format( 'MM-DD-YYYY' )
      } );
      this.isPageLoaded = true;
    } );
  }

}
