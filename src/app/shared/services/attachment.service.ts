import { ApiService } from 'src/app/shared/services/api.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class AttachmentService {

    constructor(private _apiService:ApiService) { }
    upload(object:any)
    {
       return this._apiService.upload("/Upload/Upload",object);
    }
}