import { ApiService } from 'src/app/shared/services/api.service';
import { Injectable } from '@angular/core';
import { RequestDocumentViewModel } from './request-document.model';
import { ReviewDocumentViewModel } from './review-document.model';

@Injectable( {
  providedIn: 'root'
} )
export class RequestDocumentsService {

  controller = 'RequestDocument';
  constructor( private apiService: ApiService ) { }

  post( viewModel: ReviewDocumentViewModel ) {
    return this.apiService.post( `/${this.controller}/Review`, viewModel );
  }

  getList( id: number ) {
    return this.apiService.get( `/${this.controller}/GetReview?RequestID=${id}` );
  }

  remove( Id: number ) {
    return this.apiService.remove( `/RequestDocument/delete/${Id}` );
  }
  reviewAgain( requestID: number ) {
    //alert(requestID);
    return this.apiService.post( `/RequestDocument/ReviewAgain?requestID=${requestID}`,{} );
  }
  // RequestDocument/ReviewAgain?requestID={requestID}




  getPaymentStatusList() {
    return this.apiService.get( `/${this.controller}/GetPaymentStatusList` );
  }
  getPaymentTypeList() {
    return this.apiService.get( `/${this.controller}/GetPaymentTypeList` );
  }

  getCompaniesList() {
    return this.apiService.get( `/company/getList` );
  }

}
