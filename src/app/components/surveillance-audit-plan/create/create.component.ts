import { Patterns, TodayValidator } from './../../../shared/common/patterns';
import * as moment from 'moment-timezone'; //.format('YYYY-MM-DDTHH:mm:ss')

import { CrudService } from './../../../shared/services/crud.service';
import { CRUDCreatePage } from './../../../shared/view-models/crud-create.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { RequestService } from '../../request/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../admin/employee/employee.service';
import { SelectItem } from 'src/app/shared/view-models/select-view-model';
import { AuditPlanCreateViewModel } from '../../audit-plan/audit-plan-create.model';
import { VisitCreateViewModel } from '../../audit-plan/visit-create-model';
import { VersionViewModel } from '../../audit-plan/virsion-model';
import { AuditPlanService } from '../../audit-plan/audit-plan.service';


@Component( {
  // selector: 'app-create',
  templateUrl: './create.component.html',
  // styleUrls: ['./create.component.css']
} )
export class CreateComponent implements OnInit {
  page: CRUDCreatePage = new CRUDCreatePage();
  model: AuditPlanCreateViewModel = new AuditPlanCreateViewModel();
  requestID: number = 0;
  selectedVersion: number = 0;
  employees: SelectItem[] = [];
  employes: SelectItem[] = [];

  leadAuditors: number[] = [];
  teamMembers: number[] = [];
  affairsExperts: number[] = [];
  visit: VisitCreateViewModel = new VisitCreateViewModel();
  versions: VersionViewModel[] = [];
  error: boolean;
  timeError:boolean;
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
      if ( params.has( 'version' ) ) {
        // alert( params.get( "version" ) );
        this.model.Version = +params.get( "version" );
        this.selectedVersion = +params.get( "version" );
        this.page.isEdit = true;
        this.timeError=false;

      }
      // alert( "this.model.Version : " + this.model.Version );
      // alert( "this.model.Version : " + this.selectedVersion );
      forkJoin( [
        this._auditPlanService.getByRequestID( this.model.RequestID, this.model.Version ),
        this._auditPlanService.getAllVersions( this.model.RequestID ),
        this._employeeService.GetAuditList()
      ] ).subscribe( res => {

        this.model = res[0].Data;
        if ( !params.has( 'version' ) ) {
          this.selectedVersion = this.model.Version;
          console.log(this.selectedVersion)

        }
        console.log(JSON.stringify(this.model))
        //this.model.RequestID = this.model.ID;
        this.versions = res[1].Data;
       
        this.employees = res[2].Data;
        this.model.LeadAuditors.forEach( emp => {
          this.leadAuditors.push( emp.EmployeeID );
        } );
        this.model.TeamMembers.forEach( emp => {
          this.teamMembers.push( emp.EmployeeID );
        } );
        this.model.AffairsExperts.forEach( emp => {
          this.affairsExperts.push( emp.EmployeeID );
        } );
        this.AffairsExperts();
        this.TeamMembers();
        this.AddEmployee();

        if ( this.model.Visits.length == 0 ) {
          let visit = new VisitCreateViewModel();
          visit.AuditPlanID = this.model.ID;
          // this.model.Visits.push(visit);
        }
        if ( this.model.Version<=0 ) {
          this.createForm();
          console.log("hi")
          console.log(this.model.Version)


        }
        else{
          this.createFormEdit();

        }
        this.page.isPageLoaded = true;
      }
      );
    } );
  }
  today(){
    this.timeError=false;
  }
  createForm(): void {
    this.page.form = this._crudService.formBuilder.group( {
      // ApplicationTitle: [this.model.ApplicationTitle, [Validators.required, Validators.maxLength( 100 )]],
      ConsumerName: [this.model.ConsumerName, [Validators.required, Validators.maxLength( 100 )]],
      Address: [this.model.Address, [Validators.required, Validators.maxLength( 100 )]],
      VisitNumber: [this.model.VisitNumber, [Validators.required, Validators.min( 1 ), Validators.maxLength( 9 ), Validators.pattern( Patterns.OnlyNumbers )]],
      AuditDate: [moment( this.model.AuditDate ).add(1,'days').format("MM-DD-YYYY"), [TodayValidator]],
      // LeadAuditors: [this.model.LeadAuditors, [Validators.required]],
      AuditLanguage: [this.model.AuditLanguage, [Validators.required]],
      Standards: [this.model.Standards, [Validators.maxLength( 255 )]],
      Scope: [this.model.Scope, [Validators.required,Validators.maxLength( 255 )]],
      Objectives: [this.model.Objectives, [Validators.maxLength( 255 )]],
      AdditionalNote: [this.model.AdditionalNote, [Validators.maxLength( 255 )]],
    } )
  }
  createFormEdit(): void {
    this.page.form = this._crudService.formBuilder.group( {
      // ApplicationTitle: [this.model.ApplicationTitle, [Validators.required, Validators.maxLength( 100 )]],
      ConsumerName: [this.model.ConsumerName, [Validators.required, Validators.maxLength( 100 )]],
      Address: [this.model.Address, [Validators.required, Validators.maxLength( 100 )]],
      VisitNumber: [this.model.VisitNumber, [Validators.required, Validators.min( 1 ), Validators.maxLength( 9 ), Validators.pattern( Patterns.OnlyNumbers )]],
      AuditDate: [moment( this.model.AuditDate ).format( 'MM-DD-YYYY' ), [TodayValidator]],
      // LeadAuditors: [this.model.LeadAuditors, [Validators.required]],
      AuditLanguage: [this.model.AuditLanguage, [Validators.required]],
      Standards: [this.model.Standards, [Validators.maxLength( 255 )]],
      Scope: [this.model.Scope, [Validators.required,Validators.maxLength( 255 )]],
      Objectives: [this.model.Objectives, [Validators.maxLength( 255 )]],
      AdditionalNote: [this.model.AdditionalNote, [Validators.maxLength( 255 )]],
    } )
  }
  addVisit() {
    this.model.Visits.push( this.visit );
    this.visit = new VisitCreateViewModel();
  }
  removeVisit( index: number ) {

    this.model.Visits.splice( index, 1 );
  }
  AddEmployee(){
    this.leadAuditors.forEach(e=>{
      let empName = this.employees.filter( x => x.ID == e )[0];
      this.employes.push(empName)

    })
    this.remove();

  }
  TeamMembers(){
    this.teamMembers.forEach(e=>{
      let empName = this.employees.filter( x => x.ID == e )[0];
      this.employes.push(empName)

    })
    this.remove();

  }
  AffairsExperts(){
    this.affairsExperts.forEach(e=>{
      let empName = this.employees.filter( x => x.ID == e )[0];
      this.employes.push(empName)
    })
    this.remove();


  }
  check(){
    this.employes=[];
    this.model.AdditionalAttendees.forEach(e=>{
      let empName = this.employees.filter( x => x.ID == e.EmployeeID )[0];
      this.employes.push(empName)

    })
    this.AffairsExperts();
    this.TeamMembers();
    this.AddEmployee();
    this.remove();
  }
  remove(){
    this.employes = this.employes.filter((thing,index) => {
      return index === this.employes.findIndex(obj => {
        return JSON.stringify(obj) === JSON.stringify(thing);
      });
    });
  }
  addAttendee( employeeID: number, role: string ) {
    //alert(`${employeeID}---${role}`);
    if ( !this.model.AdditionalAttendees.some( x => x.EmployeeID == employeeID ) ) {
      let empName = this.employees.filter( x => x.ID == employeeID )[0].Name;
      this.model.AdditionalAttendees.push( { ID: 0, EmployeeID: employeeID, Role: role, AuditPlanID: this.model.ID, EmployeeName: empName } );
    
       
    
    }



  }
  removeAttendee( index: number ) {
   
    this.model.AdditionalAttendees.splice( index, 1 );
  
  }
  onVersionChanged( versionID ) {
    this.selectedVersion = versionID;
    this._router.navigateByUrl( `/audit-plan/edit/${this.model.RequestID}/${versionID}` );
  }
  save() {
    this.page.isSaving = true;
    Object.assign( this.model, this.page.form.value );
    this.leadAuditors.forEach( emp => {
      this.model.LeadAuditors.push( { EmployeeID: emp, ID: 0, AuditPlanID: this.model.ID } );
    } );
    this.teamMembers.forEach( emp => {
      this.model.TeamMembers.push( { EmployeeID: emp, ID: 0, AuditPlanID: this.model.ID } );
    } );
    this.affairsExperts.forEach( emp => {
      this.model.AffairsExperts.push( { EmployeeID: emp, ID: 0, AuditPlanID: this.model.ID } );
    } );
    this.model.RequestID = this.requestID;
    console.log(JSON.stringify(this.model))
    this._auditPlanService.post( this.model ).subscribe( response => {
      // this.isSaving = true;
      if ( response.Success ) {
        // let requestID = response.Data as number;
        this._crudService.alert.success( response.Message );
        // this.isUploaded = false;
        this._router.navigateByUrl( `/request/index` );
        // console.log( "payment " + JSON.stringify( requestID ) );
      }
      else {
        this._crudService.alert.error( response.Message );
      }
    }, () => {
      this.page.isSaving = false;
    } );
  }

  disableSubmit(): boolean {
    // alert( this.selectedVersion != this.model.Version )
    // || this.selectedVersion != this.model.Version
    // this.page.isSaving || !this.page.form.valid || this.selectedVersion != this.model.Version
    return this.page.isSaving || !this.page.form.valid || this.selectedVersion != this.model.Version;
  }
  // check(){
  //   var myDate = new Date();
  //   if(myDate.getTime()>=this.page.form.value.AuditDate.getTime())
  //   {this.error=true}
  //   else if(myDate.getTime()<this.page.form.value.AuditDate.getTime())
  //   {this.error=false}

  // }


}
