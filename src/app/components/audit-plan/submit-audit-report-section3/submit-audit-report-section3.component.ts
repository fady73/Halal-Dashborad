import { CRUDCreatePage } from './../../../shared/view-models/crud-create.model';
import { CrudService } from 'src/app/shared/services/crud.service';
import { Component, OnInit } from '@angular/core';
import { AuditReportService } from '../audit-report.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuditReportSection3CreateViewModel } from '../audit-report-section3-create-view.model';
import { forkJoin } from 'rxjs';
import { Validators } from '@angular/forms';
import { AttachmentCreateViewModel } from 'src/app/shared/view-models/attachment-create.model';
import { UploadFile } from 'src/app/shared/view-models/upload-file';
import { AlertService } from '../../alert/alert.service';
import { AttachmentService } from 'src/app/shared/services/attachment.service';

@Component( {
  selector: 'app-submit-audit-report-section3',
  templateUrl: './submit-audit-report-section3.component.html',
  styleUrls: ['./submit-audit-report-section3.component.css']
} )
export class SubmitAuditReportSection3Component implements OnInit {
  isPageLoaded = false;

  page: CRUDCreatePage = new CRUDCreatePage();
  model: AuditReportSection3CreateViewModel = new AuditReportSection3CreateViewModel();
  isUploading: boolean;
  myInputVariable: any;

  constructor(
    private _crudService: CrudService,
    private _auditReportService: AuditReportService,
    private _router: Router,
    private _alertService: AlertService,
    private _attachmentService: AttachmentService,

    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initializePage();
  }

  initializePage(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      if ( params.has( 'requestID' ) ) {
        this.model.RequestID = +params.get( "requestID" );
      }


      forkJoin( [
        this._auditReportService.GetSection3ByRequestID( this.model.RequestID )
      ] ).subscribe( res => {
        console.log( res[0].Data );
        this.model = res[0].Data;
        if ( params.has( 'id' ) ) {
          this.model.ID = +params.get( "id" );
        }
        this.createForm();
        this.page.isPageLoaded = true;
      }
      );
    } );
  }

  onValidChanged( status: boolean, index: number ) {

    this.model.AuditReportRequirements[index].Found = status;
    // alert( status );
  }

  createForm(): void {
    this.page.form = this._crudService.formBuilder.group( {
      ID: [this.model.ID],
      StrengthPoints: [this.model.StrengthPoints, Validators.required],
      Notes: [this.model.Notes],
      Recommendation: [this.model.Recommendation, Validators.required]
    } )
  }
  onFileChanged( event ) {
    this.isUploading = true;
    let isAllawableExt = true;
    let fileList: FileList = event.target.files;
    if ( fileList.length > 0 ) {
      let formData: FormData = new FormData();
      for ( let index = 0; index < fileList.length; index++ ) {
        let file: File = fileList[index];

        var ext = file.name.split( '.' )[1];

        if ( ext != "pdf" && ext != "docx" && ext != "doc" ) {
          isAllawableExt = false;
        }
        else {
          formData.append( 'uploadFile_' + index, file, file.name );
        }
      }
      if ( isAllawableExt == false ) {
        this._alertService.error( "Only allawable files are pdf , doc , docx" );
        this.myInputVariable.nativeElement.value = "";
      }
      else {
        this._attachmentService.upload( formData ).subscribe( response => {
          if ( response.Success ) {
            let files: UploadFile[] = response.Data;

            for ( let index = 0; index < files.length; index++ ) {
              let item = files[index];
              let attachment = new AttachmentCreateViewModel();
              attachment.FilePath = item.FilePath;
              attachment.FileName = item.FileName;
              attachment.FileName = item.FileName;
              if ( !this.model.AuditPdfAttachments )
                this.model.AuditPdfAttachments = [];
              this.model.AuditPdfAttachments.push( attachment );
              this.isUploading = false;
            }
            this.myInputVariable.nativeElement.value = "";

          }
        }, null, () => { this.isUploading = false; } );
      }

    }

    else {
      this.isUploading = false;
    }

  }

  removeAttachment( index: number ) {
    this.model.AuditPdfAttachments.splice( index, 1 );
  }
  save() {
    this.page.isSaving = true;
    Object.assign( this.model, this.page.form.value );
    console.log( JSON.stringify( this.model ) )
    this._auditReportService.POSTSection3( this.model ).subscribe( response => {
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

  disableSubmit(): boolean {
    return this.page.isSaving || !this.page.form.valid;
  }

}
