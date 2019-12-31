import { Component, OnInit } from '@angular/core';
import { SystemConfigurationCreateViewModel } from '../system-configuration-create-view-model';
import { ConfigrationService } from '../configration.service';
import { CrudService } from 'src/app/shared/services/crud.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { CRUDCreatePage } from '../../../../shared/view-models/crud-create.model';
import { forkJoin } from 'rxjs';
import { Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectItem } from 'src/app/shared/view-models/select-view-model';

@Component({
  selector: 'app-configration',
  templateUrl: './configration.component.html',
  styleUrls: ['./configration.component.css']
})
export class ConfigrationComponent implements OnInit {
  isPageLoaded = false;
  durationOfHalaBody: SelectItem[] = [];
  renewDurationOfHalaBody: SelectItem[] = [];
  durationOfHalaEstablishment: SelectItem[] = [];
  renewDurationOfHalaEstablishment: SelectItem[] = [];

  page: CRUDCreatePage = new CRUDCreatePage();
  items: SystemConfigurationCreateViewModel = new SystemConfigurationCreateViewModel();
  constructor(
    private config: ConfigrationService,
    private _crudService: CrudService,
    //private _branchService: BranchService,
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private route: Router) { }

  ngOnInit() {
    this.durationOfHalaBody = this.initializeArray();
    this.durationOfHalaEstablishment = this.initializeArray();
    this.renewDurationOfHalaBody = this.initializeArray();
    this.renewDurationOfHalaEstablishment = this.initializeArray();
    this.initializePage();
  }

  initializePage(): void {

    //alert("this.model.Version : "+this.model.Version);
    forkJoin([
      this.config.get()
    ]).subscribe(res => {
      this.items = res[0].Data;
      console.log(res[0].Data);
      this.createForm();
      this.page.isPageLoaded = true;
    }
    );

  }


  createForm(): void {
    this.page.form = this._crudService.formBuilder.group({
      ApplicationFeeForHalalEstablishment: [this.items.ApplicationFeeForHalalEstablishment, [Validators.required]],
      LicensingFeeForHalalCertification: [this.items.LicensingFeeForHalalCertification, [Validators.required]],
      ApplicationFeeForHalalCertification: [this.items.ApplicationFeeForHalalCertification, [Validators.required]],
      LicensingFeeForHalalEstablishment: [this.items.LicensingFeeForHalalEstablishment, [Validators.required]],
      PeriodOfHalalCertificationInMonths: [this.items.PeriodOfHalalCertificationInMonths, [Validators.required]],
      PeriodOfHalalCertificationRenewalInMonths: [this.items.PeriodOfHalalCertificationRenewalInMonths, [Validators.required]],
      PeriodOfHalalEstablishmentInMonths: [this.items.PeriodOfHalalEstablishmentInMonths, [Validators.required]],
      PeriodOfHalalEstablishmentRenewalInMonths: [this.items.PeriodOfHalalEstablishmentRenewalInMonths, [Validators.required]],
    })
  }
  save(): void {
    this.page.isSaving = true;
    Object.assign(this.items, this.page.form.value) as SystemConfigurationCreateViewModel;
    this.config.post(this.items).subscribe(response => {
      this.page.isSaving = false;
      this.page.resultViewModel = response;
      if (response.Success) {
        //this.items = new SystemConfigurationCreateViewModel();
        //this.createForm();
        this._crudService.alert.success(response.Message);
        setTimeout(() => {
          this.route.navigate(['/dashboard'])
        }, 2000);

      }
      else {
        this._crudService.alert.error(response.Message);


      }
    }, error => {
      this._crudService.alert.error(error); this.page.isSaving = false;
    }, () => { this.page.isSaving = false; });
  }


  initializeArray(): SelectItem[] {
    var tempArray: SelectItem[] = [];
    for (let i = 1; i <= 48; i++) {
      var item = new SelectItem();
      item.ID = i;
      item.Name = i.toString();
      tempArray.push(item);
    }
    return tempArray;
  }
}
