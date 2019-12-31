import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { CreateComplaintModel } from './create-complaint-model';
import { ComplaintModel } from './complaint-model';

@Injectable({
  providedIn: 'root'
})
export class ComplaintServiceService {

  controller = 'Complaint';

  constructor( private apiService: ApiService ) { }

  Post( body: CreateComplaintModel ) {
    return this.apiService.post( `/${this.controller}/PostComment`, body );


  }
  approved( item: CreateComplaintModel ) {
    return this.apiService.post( `/${this.controller}/PostComment`, item );
  }
  decline( item: CreateComplaintModel ) {
    return this.apiService.post( `/${this.controller}/PostComment`, item );
  }
  
//  isAscending=1&pageIndex=1&pageSize=20&companyID=314
//   GetComplaint(  orderBy: string, isAscending: boolean, pageIndex: number ) {
//     return this.apiService.get( `/${this.controller}/Get&orderBy=${orderBy}&pageIndex=${pageIndex}&isAscending=${isAscending}&pageSize=${environment.pageSize}` );

//   }

  Get() {
    return this.apiService.get( `/${this.controller}/Get` );
  }
}
