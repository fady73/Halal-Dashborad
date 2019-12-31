import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { SurveillanceDecisionCommitteCreateViewModel } from './surveillance-decision-committe-create.model';

@Injectable( {
  providedIn: 'root'
} )
export class SurveillanceCommitteeDecisionService {
  controller = 'SurveillanceCommitteeDecision';

  constructor( private apiService: ApiService ) { }

  PostCommitteeDecision( body: SurveillanceDecisionCommitteCreateViewModel ) {
    return this.apiService.post( `/${this.controller}/POSTCommitteMemberSurveillanceDecision`, body );
  }

  GetCommitteeDecisionByRequestID( ID: number ) {
    return this.apiService.get( `/${this.controller}/Get?requestID=${ID}` );
  }
}
