import { NCRLeadAuditorCreateViewModel } from './../ncr/ncr-lead-auditor.model';
import { NCRNCSCreateViewModel } from '../ncr/ncr-ncs-create.model';
import { NCRTechnicalExpertCreateViewModel } from '../ncr/ncr-technical-expert.model';
import { NCRAffairsExpertCreateViewModel } from '../ncr/ncr-affairs-expert.model';
import { NCRTechnicalAuditorCreateViewModel } from '../ncr/ncr-technical-auditor.model';

export class NCRViewModel {
    AuditPlanID: number;
    RequestID: number;
    MainTitle: string = "On-site Assement informations";
    Title2: string = "Initial assement GSO.2055.1";
    CompanyName: string;
    CompanyAddress: string;
    Number: number;
    AssessmentTeam: string;
    AssessmentDates: string[] = [];
    TechnicalAuditors: NCRTechnicalAuditorCreateViewModel[] = [];
    LeadAuditors: NCRLeadAuditorCreateViewModel[] = [];
    AffairsExperts: NCRAffairsExpertCreateViewModel[] = [];
    TechnicalExperts: NCRTechnicalExpertCreateViewModel[] = [];
    NCSs: NCRNCSCreateViewModel[] = [];

}