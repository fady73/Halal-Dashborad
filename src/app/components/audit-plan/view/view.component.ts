import { Patterns } from './../../../shared/common/patterns';
import { CrudService } from './../../../shared/services/crud.service';
import { CRUDCreatePage } from './../../../shared/view-models/crud-create.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { forkJoin } from 'rxjs';
import * as moment from 'moment-timezone'; //.format('YYYY-MM-DDTHH:mm:ss')
import { AuditPlanService } from '../audit-plan.service';
import { RequestService } from '../../request/request.service';
import { RequestViewModel } from '../../request/request.model';
import { AuditPlanCreateViewModel } from '../audit-plan-create.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../admin/employee/employee.service';
import { SelectItem } from 'src/app/shared/view-models/select-view-model';
import { VisitCreateViewModel } from '../visit-create-model';
import { VersionViewModel } from '../virsion-model';
import { objectEach } from 'highcharts';

@Component( {
  templateUrl: './view.component.html',
} )
export class ViewComponent implements OnInit {

  page: CRUDCreatePage = new CRUDCreatePage();
  model: AuditPlanCreateViewModel = new AuditPlanCreateViewModel();
  requestID: number = 0;
  employees: SelectItem[] = [];
  leadAuditors: number[] = [];
  teamMembers: number[] = [];
  affairsExperts: number[] = [];
  visit: VisitCreateViewModel = new VisitCreateViewModel();
  versions: VersionViewModel[] = [];

  constructor(
    private _crudService: CrudService,
    private _auditPlanService: AuditPlanService,
    private _requestService: RequestService,
    private _employeeService: EmployeeService,
    private _router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initializePage();
  }

  initializePage(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      if ( params.has( 'id' ) ) {
        this.model.RequestID = +params.get( "id" );
        this.requestID = this.model.RequestID;
      }
      forkJoin( [
        this._auditPlanService.getByRequestID( this.model.RequestID, this.model.Version ),
        this._employeeService.getList()
      ] ).subscribe( res => {
        this.model = res[0].Data;
        //this.model.RequestID = this.model.ID;
        this.employees = res[1].Data;
        this.model.LeadAuditors.forEach( emp => {
          this.leadAuditors.push( emp.EmployeeID );
        } );
        this.model.TeamMembers.forEach( emp => {
          this.teamMembers.push( emp.EmployeeID );
        } );
        this.model.AffairsExperts.forEach( emp => {
          this.affairsExperts.push( emp.EmployeeID );
        } );
        if ( this.model.Visits.length == 0 ) {
          let visit = new VisitCreateViewModel();
          visit.AuditPlanID = this.model.ID;
          // this.model.Visits.push(visit);
        }
        this.page.isPageLoaded = true;
      }
      );
    } );
  }


}
