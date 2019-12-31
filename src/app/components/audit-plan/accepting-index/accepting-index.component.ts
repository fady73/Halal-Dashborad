import { NcrService } from './../corrective-action/ncr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NCRViewModel } from '../ncr/ncr.model';
import { AuditPlanService } from '../audit-plan.service';
import { AuditPlanViewModel } from '../audit-plan.model';
import { NCSCABAcceptanceCreateViewModel } from '../ncr/ncs-cap-acceptance-create';
import { CrudService } from 'src/app/shared/services/crud.service';
import { NCRNCSCreateViewModel } from '../ncr/ncr-ncs-create.model';
import { EmployeeService } from '../../admin/employee/employee.service';
import { SelectItem } from 'src/app/shared/view-models/select-view-model';
import { Validators } from '@angular/forms';
import { Patterns } from 'src/app/shared/common/patterns';
import { CRUDCreatePage } from 'src/app/shared/view-models/crud-create.model';
import { NCRService } from '../ncr.service';
import { JsonPipe } from '@angular/common';

@Component( {
  selector: 'app-accepting-index',
  templateUrl: './accepting-index.component.html',
  styleUrls: ['./accepting-index.component.css']
} )
export class AcceptingIndexComponent implements OnInit {
  isPageLoaded: boolean = false;
  page: CRUDCreatePage = new CRUDCreatePage();

  model: NCRViewModel = new NCRViewModel();
  RequestID: number = 0;
  employees: SelectItem[] = [];
  NCSItem: NCRNCSCreateViewModel = new NCRNCSCreateViewModel();

  auditPlan: AuditPlanViewModel = new AuditPlanViewModel();
  constructor( private _NcrService: NcrService,
    private _auditPlanService: AuditPlanService,
    private _NCRService: NCRService,

    private _crudService: CrudService,
    private _employeeService: EmployeeService,

    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {

  }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe( params => {
      this.model.RequestID = +params.get( 'id' );
      this.RequestID = this.model.RequestID;
      this.GetByRequestID( this.model.RequestID );
      //this.getAuditPlan(this.model.AuditPlanID);
      this._employeeService.getList().subscribe(resposne =>{
        this.employees=resposne.Data;
      })
      this.createForm();
      this.page.isPageLoaded = true;

    } );
  }
  getAuditPlan( id: number ) {
    this._auditPlanService.getById( id ).subscribe( resposne => {
      this.auditPlan = resposne.Data;
    } );
  
  }
  createForm(): void {
    this.page.form = this._crudService.formBuilder.group( {
      // ApplicationTitle: [this.model.ApplicationTitle, [Validators.required, Validators.maxLength( 100 )]],
      MainTitle: [this.model.MainTitle, [Validators.required, Validators.maxLength( 100 )]],
      Title2: [this.model.Title2, [Validators.required, Validators.maxLength( 100 )]],
      CompanyAddress: [this.model.CompanyAddress, [Validators.required, Validators.maxLength( 100 )]],
      CompanyName: [this.model.CompanyName, [Validators.required, Validators.maxLength( 100 )]],
      Number: [this.model.Number, [Validators.required, Validators.maxLength( 9 ), Validators.pattern( Patterns.OnlyNumbers )]],
      AssessmentTeam: [this.model.AssessmentTeam, [Validators.required, Validators.maxLength( 100 )]],
    } )
  }
  
  GetByRequestID( id: number ) {
    this._NcrService.getByRequestID( this.model.RequestID ).subscribe( response => {
      this.model = response.Data;
      if ( !this.model.NCSs )
        this.model.NCSs = [];
      this.model.NCSs.forEach( item => {
        item.CABAcceptance = false;
      } );
      this.isPageLoaded = true;
    } );
  }

  addNCS() {

    if(this.NCSItem.Analysis&&this.NCSItem.Description&&this.NCSItem.StandardClause&&this.NCSItem.AssessorID){
        let NCS = new NCRNCSCreateViewModel();
        Object.assign( NCS, this.NCSItem );
        NCS.Date=this.NCSItem.Date;
        this.model.NCSs.push( NCS );
        this.NCSItem = new NCRNCSCreateViewModel();
    }
  }
  removeNCS( index: number ) {
    if(this.model.NCSs.length>=2)
    {
      this.model.NCSs.splice( index, 1 );

    }
  }
  save() {
   
    let ncs: NCSCABAcceptanceCreateViewModel[] = [];
    let status = false;
    this.model.NCSs.forEach( item => {
      item.NCRID = this.model.NCSs[0].NCRID;
    } );
    this._NcrService.SaveNCS( this.model.NCSs ).subscribe( response => {
      if ( response.Success ) {
        this._crudService.alert.success( response.Message );
      }
      else {
        this._crudService.alert.error( response.Message );
      }
      this._router.navigateByUrl( `/request/index` );

    } );
    
  }


}
