import { UserRoleViewModel } from './../user-role.model';
import { RoleService } from './../../role/role.service';
import { Patterns } from './../../../../shared/common/patterns';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/components/alert/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ResultViewModel } from 'src/app/shared/view-models/result-view-models';
import { UserCreateViewModel } from '../user-create';
import { UserService } from '../user.service';
import { SelectItem } from 'src/app/shared/view-models/select-view-model';
import { forkJoin } from 'rxjs';


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
  isPageLoaded: boolean = false;
  roles:SelectItem[]=[];
  userRoles:UserRoleViewModel[]=[];
  model: UserCreateViewModel = new UserCreateViewModel();
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private _roleService: RoleService,
    private activatedRoute: ActivatedRoute,
    private _spinner: NgxSpinnerService,
    private _alertService: AlertService
  ) { }

  ngOnInit() {
    this.initializePage();
  }
  initializePage()
  {
    this._spinner.show();
    this.activatedRoute.paramMap.subscribe(params=>{
      if(params.has('id'))
      {
        this.model.ID=+params.get("id");
        this.isEdit=this.model.ID>0;
      }
     
      forkJoin([
        this._roleService.getList(),
       //this.userService.getUserRoles(this.model.ID)
      ]).subscribe(res=>{
        this.roles=res[0].Data;
        //this.userRoles=res[1].Data;
        if(this.model.ID==0)
        {
          this.createForm();
          this.isPageLoaded=true;
          this._spinner.hide();
        }
        else
        {
          this.getByID(this.model.ID);
        }
      }
      );

    });
   
  }
  getByID(id: number) {
    this._spinner.show();
    this.userService.getEditableById(id).subscribe(response => {
      if (response.Success) {
        this._spinner.hide();
        this.model = response.Data;
        this.roles.forEach(item=>{
          item.Selected=this.model.Roles.filter(x=>x.RoleID==item.ID).length>0;
        });
        this.createForm();
        this.isPageLoaded = true;
      }
    });
  }
 
  
  disabledSubmit() {
    return this.isSaving || this.isUploading || !this.form.valid;
  }
  save() {
    this.isSaving = true;
    let model = Object.assign({}, this.model, this.form.value) as UserCreateViewModel;
    this.model = model;
    this.roles.filter(x=>x.Selected).forEach(item=>{
      this.model.Roles.push({ID:0,RoleID:item.ID,UserID:this.model.ID});
    });
    this.userService.postOrUpdate(this.model).subscribe(response => {
      //this.createNotify(response.Message,response.Success);
    this.isSaving = false;
      this.resultViewModel = response;
      //alert("response : "+JSON.stringify(response));
      if (response.Success) {
        if (this.model.ID == 0) {
          this.model=new UserCreateViewModel();
          this.createForm();
        }
        this._alertService.success(response.Message);
      }
      else {
        this._alertService.error(response.Message);
      }
    }, error => {
      this._alertService.error(error);
      this.isSaving = false;
    }, () => { this.isSaving = false; });
  }

  createForm() {
    this.form = this.formBuilder.group({
      Name: [this.model.Name, [Validators.required,  Validators.maxLength(100)]],
      Email: [this.model.Email, [Validators.pattern(Patterns.Email), Validators.maxLength(100)]],
      Mobile: [this.model.Mobile, [Validators.pattern(Patterns.OnlyNumbers),Validators.required,  Validators.maxLength(100)]],
      // Code: [this.model.Code, [ Validators.maxLength(100)]],
      Password: [this.model.Password, [ Validators.maxLength(100)]],
      // NID: [this.model.NID, [ Validators.maxLength(100)]],
      // WhatsNumber: [this.model.WhatsNumber, [Validators.pattern(Patterns.OnlyNumbers), Validators.maxLength(100)]],
      // ViberNumber: [this.model.ViberNumber, [Validators.pattern(Patterns.OnlyNumbers), Validators.maxLength(100)]],
      Notes: [this.model.Notes, [ Validators.maxLength(100)]],
      IsActive: [this.model.IsActive]
    })
  }

  get name() {
    return this.form.controls["Name"];
  }
  get password() {
    return this.form.controls["Password"];
  }
  get email() {
    return this.form.controls["Email"];
  }
  get mobile() {
    return this.form.controls["Mobile"];
  }
  get code() {
    return this.form.controls["Code"];
  }
  get address() {
    return this.form.controls["Address"];
  }
  get NID() {
    return this.form.controls["NID"];
  }
  get whatsNumber() {
    return this.form.controls["WhatsNumber"];
  }
  get viberNumber() {
    return this.form.controls["ViberNumber"];
  }
  get notes() {
    return this.form.controls["Notes"];
  }

}
