import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { SystemConfigurationCreateViewModel } from './system-configuration-create-view-model';

@Injectable({
  providedIn: 'root'
})
export class ConfigrationService {

  constructor(private apiService:ApiService) { }
  get(){
    return this.apiService.get(`/SystemConfiguration/Get`);
  }

  post(body: SystemConfigurationCreateViewModel) {
        return this.apiService.post('/SystemConfiguration/POST',body);
      }
    
}
