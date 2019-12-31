export class CertificateViewModel {
    ID: number = 0;
    RequestID: number = 0;
    NumberOfAuditDays: number;
    NumberOfAuditors: number;
    TechnicalTeamVisitFee: number;
    FixedFees: number;
    TotalRemuneration: number;
    TotalOffer: number;
    SubmissionDate: string;
    CertificateExpireDate: string;
    CertificateRejectionDate: string;
    CertificateConfirmationDate: string;
    CompanyName: string;
    CountryName: string;
    CompayAddress: string;
    CertificateTypeName: string;
    ConsumerSignedAggrementFilePath: string;
    StaffSignedAggrementFilePath: string;
    ConsumerSignedAggrementFileName: string;
    StaffSignedAggrementFileName: string;
    CertificateFilePath: string;
    Status: number;
    StatusName: string;
    StaffRequiredAction: number;
    ConsumerRequiredAction: number;
    ConsumerRequiredActionName: string;
    StaffRequiredActionName: string;
}