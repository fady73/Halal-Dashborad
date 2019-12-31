
import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { ResetPasswordCreateViewModel } from 'src/app/components/user/reset-password/reset-password-create';
import { ForgetPasswordCreateViewModel } from 'src/app/components/user/forget-password/forget-password-create';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  constructor(private apiService:ApiService) { }
  
  forgetPassword(body: ForgetPasswordCreateViewModel) {

   // return this.apiService.update('/user/putResetPassword',body);
  }
 

}
