import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/shared/services/api.service';
import { Injectable } from '@angular/core';
import { PaymentSearchViewModel } from './payment-search.model';
import { PaymentViewModel } from './payment.model';
import { PaymentCancelViewModel } from './payment-cancel.model';

@Injectable( {
  providedIn: 'root'
} )
export class PaymentService {

  controller = 'RequestPayment';
  constructor( private apiService: ApiService ) { }
  get( searchViewModel: PaymentSearchViewModel, orderBy: string, isAscending: boolean, pageIndex: number ) {
    // tslint:disable-next-line:max-line-length
    return this.apiService.get( `/RequestPayment/get?forStaff=true&requestType=${searchViewModel.TypeID}&requestStatus=${searchViewModel.StatusID}&CountryID=${searchViewModel.CountryID}&CompanyID=${searchViewModel.CompanyID}&ToDate=${searchViewModel.ToDate}&FromDate=${searchViewModel.FromDate}&orderBy=${orderBy}&pageIndex=${pageIndex}&isAscending=${isAscending}&pageSize=${environment.pageSize}` );
  }

  GetRequestPendingPayments( RequestID: number ) {
    return this.apiService.get( `/RequestPayment/GetRequestPendingPayments?RequestID=${RequestID}` )
  }

  GetRequestPayments( RequestID: number ) {
    return this.apiService.get( `/RequestPayment/GetRequestPayments?RequestID=${RequestID}` )
  }


  remove( Id: number ) {
    return this.apiService.remove( `/RequestPayment/delete/${Id}` );
  }

  approved( item: PaymentViewModel ) {
    return this.apiService.post( `/RequestPayment/ConfirmPayment?requestID=${item.RequestID}&paymentID=${item.ID}`, item );
  }
  cancel( item: PaymentCancelViewModel ) {
    return this.apiService.post( `RequestPayment/RejectPayment`,item);
  }

  approvedappeal( item: PaymentViewModel ) {
    return this.apiService.post( `AppealRequest/AcceptAppeal?appealID=${item.ID}`, item );
  }
  cancelappeal( item: PaymentCancelViewModel ) {
    return this.apiService.post( `AppealRequest/RejectAppeal`,item);
  }
  getByID( Id: number ) {
    return this.apiService.get( `/RequestPayment/getByID/${Id}` );
  }




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
