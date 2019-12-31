
import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { ResetPasswordCreateViewModel } from 'src/app/components/user/reset-password/reset-password-create';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private apiService:ApiService) { }
  
  ResetPassworrd(body: ResetPasswordCreateViewModel) {

    return this.apiService.update('/user/putResetPassword',body);
  }
 

}
