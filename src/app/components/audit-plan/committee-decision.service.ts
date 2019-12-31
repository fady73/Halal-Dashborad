import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { RequestCommentViewModel } from '../request/request-comment.model';
import { RequestCommitteeDecisionCreate } from './request-committee-decision-create';
import { PaymentSearchViewModel } from '../payment/payment-search.model';
import { environment } from 'src/environments/environment';

@Injectable( {
  providedIn: 'root'
} )
export class CommitteeDecisionService {
  controller = 'RequestCommitteeDecision';

  constructor( private apiService: ApiService ) { }

  PostCommitteeDecision( body: RequestCommitteeDecisionCreate ) {
    return this.apiService.post( `/${this.controller}/POSTCommitteMemberRequestDecision`, body );


  }
  GetCommitteeDecision( searchViewModel: PaymentSearchViewModel, orderBy: string, isAscending: boolean, pageIndex: number ) {
    return this.apiService.get( `/${this.controller}/Get?requestType=${searchViewModel.TypeID}&requestStatus=${searchViewModel.StatusID}&CountryID=${searchViewModel.CountryID}&CompanyID=${searchViewModel.CompanyID}&ToDate=${searchViewModel.ToDate}&FromDate=${searchViewModel.FromDate}&orderBy=${orderBy}&pageIndex=${pageIndex}&isAscending=${isAscending}&pageSize=${environment.pageSize}` );

  }

  GetCommitteeDecisionByRequestID( ID: number ) {
    return this.apiService.get( `/${this.controller}/Get?requestID=${ID}` );
  }
}
