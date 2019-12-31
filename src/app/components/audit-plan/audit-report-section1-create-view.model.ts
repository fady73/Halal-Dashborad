import { LeadAuditorCreateViewModel } from './lead-auditor-create-model';
import { AffairsExpertCreateViewModel } from './affairs-expert-create-model';

export class AuditReportSection1CreateViewModel {
    ID: number = 0;
    RequestID: number = 0;
    AuditReportSection: number = 0;
    OtherSpecifications: string = "";
    AuditAddress: string = "";
    ApprovalAuthority: string = "";
    AuditType: string = "";
    LastAuditDate: Date = new Date();
    CertificateExpirationDate: Date = new Date();
    LastAuditType: string = "";
    AuditTimeJustification: Date = new Date();
    NumberOfEmployees: number = 0;
    NumberOfShifts: number = 0;
    NumberOfProductionLines: number = 0;
    HCCPLinesNumber: number = 0;
    CategoryID: number;
    AuditTeamLeaderID: number;
    IslamicAffairsExpertID: number;
    AdditionalAttendees: string = "";
    Deviation: string = "";
    CertificateScope: string = "";
    ScopeExceptions: string = "";
    OrganizationDescription: string = "";
    AffairsExperts: AffairsExpertCreateViewModel[] = [];
    LeadAuditors: LeadAuditorCreateViewModel[] = [];
}