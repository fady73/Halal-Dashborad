import { AlertService } from 'src/app/components/alert/alert.service';

import {throwError as observableThrowError,  Observable } from 'rxjs';
import { TokenService } from './token.service';
import { LocalizationService } from './localization.service';
import { Injectable } from '@angular/core';
import {map,catchError} from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ResultViewModel } from '../view-models/result-view-models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  //userToken: string;

  constructor(private route: Router, private tokenService:TokenService,private http: HttpClient, private localizationService: LocalizationService,
    private _alertService:AlertService
    ) {
    //this.userToken = this.tokenService.getToken();
  }

  // Request options
  private setHeaders(): HttpHeaders {

    let headersConfig =
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'language': this.localizationService.getLanguage(),
        'token':this.tokenService.getToken()
      };
    return new HttpHeaders(headersConfig);
  }

  private setHeadersWithImage(): HttpHeaders {
    let headersConfig =
      {
        'Accept': 'application/json',
        'language': this.localizationService.getLanguage(),
        'token':this.tokenService.getToken()
      };
    return new HttpHeaders(headersConfig);
  }

  private formatErrors(error: any) {
    
    
    if(error.status=="401"){
      
    }
    else if (error.status=="500")
    {
      this._alertService.error("حدث خطأ من فضلك حاول لاحقاً");
    }
    else if (error.status=="404")
    {
      this._alertService.error("حدث خطأ من فضلك حاول لاحقاً");
    }
    
    return observableThrowError(error.json());
  }

  get(path: string, params?: HttpParams): Observable<ResultViewModel> {
    
    return this.http.get(`${environment.api_url}${path}`, { headers: this.setHeaders(), params }).pipe(catchError(er=>this.formatErrors(er)), map((res: ResultViewModel) => res));
  }

  
  getImages(path: string): Observable<Blob> {
   
    return this.http.get(`${environment.api_url}${path}`,{responseType:'blob'});
  }

  
  post(path: string, body: Object = {}): Observable<ResultViewModel> {
    return this.http.post(`${environment.api_url}${path}`, body, { headers: this.setHeaders() })
    .pipe(catchError(this.formatErrors),map((res: ResultViewModel) => res));
  }

  update(path: string, body: Object = {}): Observable<ResultViewModel> {
    return this.http.put(`${environment.api_url}${path}`, body, { headers: this.setHeaders() }).pipe(catchError(this.formatErrors),map((res: ResultViewModel) => res));
  }

  remove(path: string): Observable<ResultViewModel> {
    return this.http.delete(`${environment.api_url}${path}`, { headers: this.setHeaders() })
      .pipe(catchError(this.formatErrors),map((res: ResultViewModel) => res));
  }

  upload(path: string, body: Object): Observable<ResultViewModel> {
    return this.http.post(`${environment.api_url}${path}`, body, { headers: this.setHeadersWithImage() })
      .pipe(map((res: ResultViewModel) => res));
  }

  // download(path: string, image: string): Observable<ResultViewModel> {
  //   return this.http.post(`${environment.api_url}${path}${image}`, { headers: this.setHeadersWithImage() })
  //     .pipe(map((res: ResultViewModel) => res));
  // }

  removeAttachment(path: string): Observable<ResultViewModel> {
    return this.http.get(`${environment.api_url}${path}`, { headers: this.setHeaders() }).pipe(map((res: ResultViewModel) => res));
  }
}
