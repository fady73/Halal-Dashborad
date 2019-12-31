import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/components/alert/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ResultViewModel } from 'src/app/shared/view-models/result-view-models';
import { SelectItem } from 'src/app/shared/view-models/select-view-model';
import { forkJoin } from 'rxjs';
import { EmployeeCreateViewModel } from '../Employee-create';
import { EmployeeService } from '../Employee.service';
import { JobService } from '../../job/job.service';


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
  Jobs:SelectItem[]=[];
  
  model: EmployeeCreateViewModel = new EmployeeCreateViewModel();
  constructor(private formBuilder: FormBuilder,
    private EmployeeService: EmployeeService,
    private JobService: JobService,
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
        this.JobService.getList(),
        this.EmployeeService.getEditableById(this.model.ID)
      ]).subscribe(res=>{
        this.Jobs=res[0].Data;
        this.model=res[1].Data;
        // if(this.model.ID==0)
        // {
          this.createForm();
          this.isPageLoaded=true;
          this._spinner.hide();
        // }
        // else
        // {
        //   this.getByID(this.model.ID);
        // }
      }
      );

     

    });
   
  }
  
  
  
 
  createForm() {
    this.form = this.formBuilder.group({
      NameArabic: [this.model.NameArabic, [Validators.required,  Validators.maxLength(100)]],
      NameEnglish: [this.model.NameEnglish, [Validators.required,  Validators.maxLength(100)]],
      Code: [this.model.Code, [Validators.required,  Validators.maxLength(100)]],
      IsActive: [this.model.IsActive]
    })
  }
  
  disabledSubmit() {
    return this.isSaving  || this.isUploading || !this.form.valid;
  }
  save() {
    this.isSaving = true;
    let model = Object.assign({}, this.model, this.form.value) as EmployeeCreateViewModel;
    this.model = model;
    this.EmployeeService.postOrUpdate(this.model).subscribe(response => {
      //this.createNotify(response.Message,response.Success);
    this.isSaving = false;
      this.resultViewModel = response;
      //alert("response : "+JSON.stringify(response));
      if (response.Success) {
        if (this.model.ID == 0) {
          this.createForm();
        }
        this._alertService.success(response.Message);
      }
      else {
        this._alertService.error(response.Message);
      }
    }, error => {
      this._alertService.error(error);
    }, () => { this.isSaving = false; });
  }


  get icon() {
    return this.form.controls["Symbol"];
  } 
  get buyExchangeRate() {
    return this.form.controls["BuyExchangeRate"];
  }
  get code() {
    return this.form.controls["Code"];
  }
  get nameenglish() {
    return this.form.controls["NameEnglish"];
  }
  get namearabic() {
    return this.form.controls["NameArabic"];
  }


}
