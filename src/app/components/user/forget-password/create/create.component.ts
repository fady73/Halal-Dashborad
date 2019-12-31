import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../../../../../node_modules/angular2-notifications';
import { ResultViewModel } from '../../../../shared/view-models/result-view-models';
import { SelectItem } from '../../../../shared/view-models/select-view-model';
import { ActivatedRoute } from '@angular/router';
import { UploadFile } from '../../../../shared/view-models/upload-file';
import { AlertService } from 'src/app/components/alert/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ResetPasswordCreateViewModel } from 'src/app/components/user/reset-password/reset-password-create';
import { ResetPasswordService } from 'src/app/components/user/reset-password/reset-password.service';
// import { Router } from '@angular/router/src/router';
// import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

import { TokenService } from 'src/app/shared/services/token.service';
import { ForgetPasswordCreateViewModel } from 'src/app/components/user/forget-password/forget-password-create';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form: FormGroup;
  isUploading: boolean = false;
  isEdit: boolean = false;
  isSaving: boolean = false;
  resultViewModel: ResultViewModel;
  departmentsList: SelectItem[] = [];
  isPageLoaded: boolean = false;
  model: ForgetPasswordCreateViewModel = new ForgetPasswordCreateViewModel();
  constructor(private formBuilder: FormBuilder,
    private resetPasswordService: ResetPasswordService,
    private tokenService: TokenService,
    private activatedRoute: ActivatedRoute,
    private router : Router,
    private spinner: NgxSpinnerService,
    private _alertService: AlertService
    
  ) { }

  ngOnInit() {
       this.isPageLoaded = true;
        this.createForm();
  
  }
  
  createForm() {
    this.form = this.formBuilder.group({
      Email: [this.model.Email, [Validators.required, Validators.maxLength(100)]],
    })
  }
 
  disabledSubmit() {
    return this.isSaving || this.isUploading || !this.form.valid;
  }
  

  save() {
    this.isSaving = true;
    let model = Object.assign({}, this.model, this.form.value) as ForgetPasswordCreateViewModel;
    this.model = model;
 
  }


  get email() {
    return this.form.controls["Email"];
  }

}
