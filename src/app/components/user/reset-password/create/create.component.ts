import { UserService } from '../../../admin/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ResultViewModel } from '../../../../shared/view-models/result-view-models';
import { SelectItem } from '../../../../shared/view-models/select-view-model';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/components/alert/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ResetPasswordCreateViewModel } from 'src/app/components/user/reset-password/reset-password-create';
import { ResetPasswordService } from 'src/app/components/user/reset-password/reset-password.service';
import { Router } from '@angular/router';

import { TokenService } from 'src/app/shared/services/token.service';


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
  model: ResetPasswordCreateViewModel = new ResetPasswordCreateViewModel();
  constructor(private formBuilder: FormBuilder,
    private resetPasswordService: ResetPasswordService,
    private tokenService: TokenService,
    private userService: UserService,
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
      OldPassword: [this.model.OldPassword, [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      NewPassword: [this.model.NewPassword, [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      ConfirmNewPassword: [this.model.ConfirmNewPassword, [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
    })
  }
 
  disabledSubmit() {
    return this.isSaving || this.isUploading || !this.form.valid;
  }
  save() {
    this.isSaving = true;
    let model = Object.assign({}, this.model, this.form.value) as ResetPasswordCreateViewModel;
    this.model = model;
    this.resetPasswordService.ResetPassworrd(this.model).subscribe(response => {
      //this.createNotify(response.Message,response.Success);
      this.resultViewModel = response;
      //alert("response : "+JSON.stringify(response));
      if (response.Success) {
        
        this._alertService.success(response.Message);
        this.userService.signOut().subscribe(res=>{
          this.tokenService.removeToken(); 
          this.router.navigate(['/login'])
          
        })
      }
      else {
        this._alertService.error(response.Message);
      }
    }, error => {
      this._alertService.error(error);
    }, () => { this.isSaving = false; });
  }


  get oldPassword() {
    return this.form.controls["OldPassword"];
  }

  get newPassword() {
    return this.form.controls["NewPassword"];
  }
  get confirmNewPassword() {
    return this.form.controls["ConfirmNewPassword"];
  }

}
