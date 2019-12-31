import { NCRNCSCreateViewModel } from './../ncr/ncr-ncs-create.model';
import { SelectItem } from './../../../shared/view-models/select-view-model';
import { Patterns } from './../../../shared/common/patterns';
import { CrudService } from './../../../shared/services/crud.service';
import { CRUDCreatePage } from './../../../shared/view-models/crud-create.model';
import { NCRCreateViewModel } from './../ncr/ncr-create.model';
import { Component, OnInit } from '@angular/core';
import { NCRService } from '../ncr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { EmployeeService } from '../../admin/employee/employee.service';
import { Validators } from '@angular/forms';
import { objectEach } from 'highcharts';

@Component( {
  selector: 'app-submit-ncr',
  templateUrl: './submit-ncr.component.html',
  // styleUrls: ['./submit-ncr.component.css']
} )
export class SubmitNcrComponent implements OnInit {
  page: CRUDCreatePage = new CRUDCreatePage();
  model: NCRCreateViewModel = new NCRCreateViewModel();
  employees: SelectItem[] = [];
  NCSItem: NCRNCSCreateViewModel = new NCRNCSCreateViewModel();
  constructor(
    private _NCRService: NCRService,
    private _employeeService: EmployeeService,
    private _crudService: CrudService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initializePage();
  }

  initializePage(): void {
    this._activatedRoute.paramMap.subscribe( params => {
      if ( params.has( 'id' ) ) {
        this.model.RequestID = +params.get( "id" );
      }
      forkJoin( [
        this._NCRService.getByAuditPlanID( this.model.RequestID ),
        //this._employeeService.getList()
        //  this._auditPlanService.getAllVersions( this.model.RequestID ),
        this._employeeService.getList()
      ] ).subscribe( res => {
        this.model = res[0].Data;
        this.employees = res[1].Data;
        //this.model.RequestID = this.model.ID;
        this.createForm();
        this.page.isPageLoaded = true;
      }
      );
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
    this.model.NCSs.splice( index, 1 );
  }
  removeLeadAuditor( index: number ) {
    this.model.LeadAuditors.splice( index, 1 );
  }
  removeTechnicalAuditor( index: number ) {
    this.model.TechnicalAuditors.splice( index, 1 );
  }
  removeAffairsExpert( index: number ) {
    this.model.AffairsExperts.splice( index, 1 );
  }
  removeTechnicalExpert( index: number ) {
    this.model.TechnicalExperts.splice( index, 1 );
  }
  save() {
    this.page.isSaving = true;
    Object.assign( this.model, this.page.form.value );

    //this.model.RequestID=this.requestID;
    this._NCRService.post( this.model ).subscribe( response => {
      // this.isSaving = true;
      if ( response.Success ) {
        // let requestID = response.Data as number;
        this._crudService.alert.success( response.Message );
        // this.isUploaded = false;
        this._router.navigateByUrl( `/request/index` );
      }
      else {
        this._crudService.alert.error( response.Message );
      }
    }, () => {
      this.page.isSaving = false;
    } );
  }




}
