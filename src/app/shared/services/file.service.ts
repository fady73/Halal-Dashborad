import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})
export class FileService {

  constructor(
    private apiService:ApiService
  ) { }

post(path:string,body:Object){
  return this.apiService.upload(path,body);
}

delete(path:string,fileName:Object){
  return this.apiService.removeAttachment('/research/DeleteAttachment?fileName='+fileName);
}
// get(path:string,image:string){
//   return this.apiService.
// }
}
