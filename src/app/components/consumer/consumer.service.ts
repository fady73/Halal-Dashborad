import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/shared/services/api.service';
import { Injectable } from '@angular/core';
import { ConsumerSearchViewModel } from './consumer-search.model';
import { ConsumerViewModel } from './consumer.model';

@Injectable( {
  providedIn: 'root'
} )
export class ConsumerService {

  controller = 'Company';
  constructor( private apiService: ApiService ) { }
  get( searchViewModel: ConsumerSearchViewModel, orderBy: string, isAscending: boolean, pageIndex: number ) {
    // tslint:disable-next-line:max-line-length
    return this.apiService.get( `/${this.controller}/get?name=${searchViewModel.Name}&Phone=${searchViewModel.Phone}&Status=${searchViewModel.Status}&CountryID=${searchViewModel.CountryID}&Name=${searchViewModel.Name}&ToDate=${searchViewModel.ToDate}&FromDate=${searchViewModel.FromDate}&orderBy=${orderBy}&pageIndex=${pageIndex}&isAscending=${isAscending}&pageSize=${environment.pageSize}` );
  }
 
  remove( Id: number ) {
    return this.apiService.remove( `/${this.controller}/delete/${Id}` );
  }
  
  approved( item: ConsumerViewModel ) {
    return this.apiService.post( `/${this.controller}/ApproveCompany/${item.ID}`, item );
  }
  decline( item: ConsumerViewModel ) {
    return this.apiService.post( `/${this.controller}/DeclineCompany/${item.ID}`, item );
  }
  
  cancel( item: ConsumerViewModel ) {
    return this.apiService.post( `/${this.controller}/RejectConsumer?consumerID=${item.ID}`, item );
  }
  getByID( Id: number ) {
    return this.apiService.get( `/${this.controller}/getByID/${Id}` );
  }
  getStatusList() {
    return this.apiService.get( `/${this.controller}/getStatusList` );
  }
}
