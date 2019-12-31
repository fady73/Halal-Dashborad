import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ResultViewModel } from '../../../shared/view-models/result-view-models';
import { TokenService } from '../../../shared/services/token.service';
import { ApiService } from '../../../shared/services/api.service';
import { LocalizationService } from '../../../shared/services/localization.service';
import { Patterns } from '../../../shared/common/patterns';
import { AlertService } from '../../alert/alert.service';
import { LoginViewModel } from './models/login.model';
import { UserService } from '../../admin/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model:LoginViewModel;
  isLoading:boolean=false;
  isPageLoaded=false;
  result:ResultViewModel;
  form:FormGroup;
  constructor(    private userService: UserService,
    private alertService: AlertService,private tokenService:TokenService,private apiService:ApiService,private route:Router,
    private formBuilder:FormBuilder,private translate: TranslateService,private localizationService:LocalizationService) {
    // the lang to use, if the lang isn't available, it will use the current loader to get them
   this.translate.use(localizationService.getLanguage());
   }
   ngOnInit() {
    this.model = new LoginViewModel();
     this.createForm();
     this.isPageLoaded=true;

  }
  // changeLanguage(){}
createForm()
{
  this.form=this.formBuilder.group(
    {
      Email:['',[Validators.pattern(Patterns.Email),Validators.required,Validators.minLength(4),Validators.maxLength(100)]],
      Password:['',[Validators.required]]
    }
  );
}
login(){
  this.isLoading=true;
  this.model = Object.assign(this.model,this.form.value);
  this.userService.login(this.model).subscribe(response=>{
    this.result = response;
    if(response.Success)
    {
      this.tokenService.setToken(response.Data["AccessToken"]);
      this.route.navigateByUrl("/dashboard");
    }
    else{
      this.alertService.error(response.Message);
    }
  },null,()=>{
   
    this.isLoading=false;
  });
  
}
 changeLanguage() {
  window.location.reload();
  this.localizationService.setLanguage(this.localizationService.getLanguage() == 'ar' ? 'en' : 'ar');
  this.translate.use(this.localizationService.getLanguage());
} 
 

}
