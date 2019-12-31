import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AppendixClassificationService {

  controller="request";
  constructor(private apiServise:ApiService) { }
  getProductCategories(){
    return this.apiServise.get("/productCategory/get");
  }
  getAppendixI(id:number)
  {
    return this.apiServise.get(`/${this.controller}/getAppendixI?requestID=${id}`);
  }
 
}
