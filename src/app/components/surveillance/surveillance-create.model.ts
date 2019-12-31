import { SurveillanceStatus } from './surveillance-status.enum';

export class SurveillanceCreateViewModel {
    ID: number = 0;
    RequestID: number = 0
    NumberOfAuditDays: number;
    NumberOfAuditors: number;
    Type: SurveillanceStatus;
    TotalOffer: number;
    FixedFees: number;
    TotalRemuneration: number;
    TechnicalTeamVisitFee: number;
    SubmissionDate: string;
    CompanyName: string;
    CountryName: string;
    CompayAddress: string;
}