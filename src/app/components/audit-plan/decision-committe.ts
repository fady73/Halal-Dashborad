import { PaymentViewModel } from '../payment/payment.model';
import { RequestCommitteeDecisionCreate } from './request-committee-decision-create';

export class DecisionCommitte {
    ID: number;
    RequestID: number;
    PaymentDate: Date;
    ApproveStatus: number;
    CompanyName: string;
    CountryName: string;
    CompanyCountry: string;
    ApplicationDate: string;
    AssignedEmployee: string;
    Note: string;
    FilePath: string;
    RequestStatusName: string;
    StaffRequiredAction: number;
    AuditReportPDFFilePath: string;
    CertificateDate: string;
    CertificateExpireDate:string;
    CertificateRejectionDate :string;
    Item: PaymentViewModel = new PaymentViewModel();
    CommitteeDecision: RequestCommitteeDecisionCreate = new RequestCommitteeDecisionCreate();
}

