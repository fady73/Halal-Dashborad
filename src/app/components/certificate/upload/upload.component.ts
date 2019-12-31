import { AttachmentService } from './../../../shared/services/attachment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '../../../shared/view-models/page.model';
import { CrudService } from 'src/app/shared/services/crud.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from '../../alert/alert.service';
import { environment } from 'src/environments/environment';
import { CertificateUploadViewModel } from '../certificate-upload.model';
import { CertificateService } from "../certificate.service";

@Component( {
  selector: 'app-upload',
  templateUrl: './upload.component.html'
} )
export class UploadComponent implements OnInit {
  page: Page = new Page();
  model: CertificateUploadViewModel = new CertificateUploadViewModel();
  isPageLoaded = false;
  isSaving = false;
  isUploaded = false;
  @ViewChild( 'dropzone', { static: false } ) dropzone: any;

  constructor(
    private _certificateService: CertificateService,
    private crud: CrudService,
    private _attachmentService: AttachmentService,
    private _activatedRoute: ActivatedRoute,
    private _alertService: AlertService,
    private _router: Router
  ) {

  }

  ngOnInit() {
    this.initializePage();
  }

  initializePage() {
    this._activatedRoute.paramMap.subscribe( params => {
      if ( params.has( 'id' ) ) {
        this.model.RequestID = +params.get( 'id' );
        //alert(this.model.ID);
      }
    } );
  }

  onFileChanged( file: File ) {
    let isAllawableExt = true;
    let isBiggerThan2MB = false;
    this.isUploaded = false;
    let formData: FormData = new FormData();
    var ext = file[0].name.split( '.' )[1];

    if ( ext != "pdf" ) {
      isAllawableExt = false;
    }
    else if ( ( file[0].size / 1024 / 1024 ) > environment.fileSize ) {
      isBiggerThan2MB = true;
    }
    else {
      formData.append( 'uploadFile_' + 0, file[0], file[0].name );
    }

    if ( isAllawableExt == false ) {
      this._alertService.error( "Only allawable files are pdf" );
      this.dropzone.reset();
    }
    else if ( isBiggerThan2MB == true ) {
      this._alertService.error( "Maximum file size is 2 MB" );
      this.dropzone.reset();
    }
    else {
      this._attachmentService.upload( formData ).subscribe( response => {
        if ( response.Success ) {
          // fileList = []
          this.dropzone.reset();
         
          let file = response.Data[0];
          this.model.FilePath = file.FilePath;
          this.model.FileName = file.FileName;
          this.model.Type = file.Extension;
        }
      },
        error => {
          this._alertService.error( " Maximum file size is 2 MB" );
        }
        , () => { this.isUploaded = true; } );
    }
  }


  removeAttachment() {
    this.model.FilePath = "";
    this.model.FileName = "";
    this.model.Type = "";
    this.isUploaded = false;
  }
  deleteFile() {
  }

  reset() {
    this.model = new CertificateUploadViewModel();
    this.isUploaded = false;
  }
  save() {
    this.isSaving = true;
    this._certificateService.upload( this.model ).subscribe( response => {
      // this.isSaving = true;
      if ( response.Success ) {
        // let requestID = response.Data as number;
        this._alertService.success( response.Message );
        // this.isUploaded = false;
        this._router.navigateByUrl( `/request/index` );
      }
      else {
        this._alertService.error( response.Message );
      }
    }, () => {
      this.isSaving = false;
    } );
  }
}

