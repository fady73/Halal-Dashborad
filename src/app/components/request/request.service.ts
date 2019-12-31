import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/shared/services/api.service';
import { Injectable } from '@angular/core';
import { RequestSearchViewModel } from './request-search.model';
import { RequestCommentViewModel } from './request-comment.model';
import { RequestViewModel } from './request.model';
import { ProductHalalLogoDetailCreateViewModel } from './product-halal-logo-detail-create-view-model';
import { RequestFinalActionCreateViewModel } from './viewModels/request-final-action-create-view-model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  decline(selectedItem: RequestViewModel) {
    return this.apiService.post(`/Request/DeclineConsumerCancelRequest?requestID=${selectedItem.ID}`);

  }

  controller = 'Request';
  constructor(private apiService: ApiService) { }
  get(searchViewModel: RequestSearchViewModel, orderBy: string, isAscending: boolean, pageIndex: number) {
    // tslint:disable-next-line:max-line-length
    // name=${searchViewModel.Name}&
    return this.apiService.get(`/request/get?requestID=null&requestType=${searchViewModel.TypeID}&requestStatus=${searchViewModel.StatusID}&CountryID=${searchViewModel.CountryID}&CompanyID=${searchViewModel.CompanyID}&ToDate=${searchViewModel.ToDate}&FromDate=${searchViewModel.FromDate}&orderBy=${orderBy}&pageIndex=${pageIndex}&isAscending=${isAscending}&pageSize=${environment.pageSize}`);
  }
  POSTRequestComments(comments: RequestCommentViewModel[]) {
    return this.apiService.post(`/RequestComment/POSTRequestComments`, comments);

  }
  getComments(id: number) {
    return this.apiService.get(`/RequestComment/GetRequestComments?requestID=${id}`);
  }
  remove(Id: number) {
    return this.apiService.remove(`/request/delete/${Id}`);
  }

  assign(item: RequestViewModel) {
    //alert(item.AssignedEmployeeID);
    // return this.apiService.post( `/request/AssignEmployee?requestID=${item.ID}&employeeID=${item.AssignedEmployeeID}`, item );
    return this.apiService.post(`/request/AssignEmployee?requestID=${item.ID}&employeeID=${item.AssignedEmployeeID}`, item);
  }
  cancel(item: RequestViewModel) {

    return this.apiService.post(`/Request/ConfirmConsumerCancelRequest?RequestID=${item.ID}`, item);
  }
  unAssign(item: any) {
    return this.apiService.post(`/request/UnAssignEmployee/${item.ID}`, item);
  }
  getByID(Id: number) {
    return this.apiService.get(`/request/getByID/${Id}`);
  }

  ProceedToAuditReport() {
    alert("ProceedToAuditReport")
    return this.apiService.get(`/NCR/ProceedToAuditReport`);
  }
  getRequiredCertificate(id: number) {
    return this.apiService.get(`/${this.controller}/GetRequiredCertificate?requestID=${id}`);
  }
  getScopeProcesses(id: number) {
    return this.apiService.get(`/RegularRequest/getByID?ID=${id}`);
  }
  getScopeProcessesTypeTwo(id: number) {
    return this.apiService.get(`/RecognitionRequest/getByID?ID=${id}`);
  }
  getOperations(id: number) {
    return this.apiService.get(`/${this.controller}/GetOperationsDetails?requestID=${id}`);
  }

  getSales(id: number) {
    return this.apiService.get(`/RegularRequest/GetMarketingCountry?RegularRequestID=${id}`);
  }
  getVisitCost(id: number) {
    return this.apiService.get(`/${this.controller}/GetEditableVisitCost?requestID=${id}`);
  }
  getRequestStatusList() {
    return this.apiService.get(`/${this.controller}/GetRequestStatusList`);
  }
  getRequestTypeList() {
    return this.apiService.get(`/${this.controller}/GetRequestTypeList`);
  }

  getCertificateTypeList() {
    return this.apiService.get(`/${this.controller}/getCertificateTypeList`);
  }
  getCompaniesList() {
    return this.apiService.get(`/company/getList`);
  }

getregularmodificate(id:number)
{
  return this.apiService.get(`RegularRequest/GetRequestModification?requestID=${id}`);
}

approveRequestModification(requestID: number, fees: number)
{
  return this.apiService.post(`RegularRequest/AcceptRequestModification?requestID=${requestID}&fees=${fees}`)
}
  postRequestComment(comment: RequestCommentViewModel) {
    return this.apiService.post(`/RequestComment/post`, comment);
  }
  //  ProductHalalLogo/GetByRequestID?requestID={requestID}
  getHalalLogoRegest(id: number) {
    return this.apiService.get(`/ProductHalalLogo/GetByRequestID?requestID=${id}`);

  }
  acceptLogo(viewModel: ProductHalalLogoDetailCreateViewModel) {
    return this.apiService.post(`/ProductHalalLogo/Confirm`, viewModel);

  }
  refuseLogo(viewModel: ProductHalalLogoDetailCreateViewModel) {
    return this.apiService.post(`/ProductHalalLogo/Reject`, viewModel);


  }

  getCancelActionReasonsList() {
    return this.apiService.get(`/${this.controller}/GetCancelActionReasonsList`);
  }

  getSuspendActionReasonsList() {
    return this.apiService.get(`/${this.controller}/GetSuspendActionReasonsList`);
  }

  getWithdrawActionReasonsList() {
    return this.apiService.get(`/${this.controller}/GetWithdrawActionReasonsList`);
  }

  withdrawRequest(body: RequestFinalActionCreateViewModel) {
    return this.apiService.post(`/${this.controller}/WithdrawRequest`, body);
  }


  cancelRequest(body: RequestFinalActionCreateViewModel) {
    return this.apiService.post(`/${this.controller}/CancelRequest`, body);
  }


  suspendRequest(body: RequestFinalActionCreateViewModel) {
    return this.apiService.post(`/${this.controller}/SuspendRequest`, body);
  }


  resumeRequest(requestID) {
    return this.apiService.post(`/${this.controller}/ResumeRequest?requestID=${requestID}`);
  }
}
