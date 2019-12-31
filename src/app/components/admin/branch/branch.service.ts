
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private apiService:ApiService) { }
  
 
  getList(){
    return this.apiService.get(`/Branch/GetList`);
  }
  
  
 
}
