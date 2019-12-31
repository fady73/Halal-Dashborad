import { PaymentViewModel } from '../payment/payment.model';
import { SurveillanceDecisionCommitteCreateViewModel } from './surveillance-decision-committe-create.model';

export class SurveillanceDecisionCommitte {
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
    CommitteeDecision: SurveillanceDecisionCommitteCreateViewModel = new SurveillanceDecisionCommitteCreateViewModel();
}

