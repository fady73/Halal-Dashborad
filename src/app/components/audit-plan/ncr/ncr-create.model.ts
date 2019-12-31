import { NCRTechnicalAuditorCreateViewModel } from './ncr-technical-auditor.model';
import { NCRLeadAuditorCreateViewModel } from './ncr-lead-auditor.model';
import { NCRAffairsExpertCreateViewModel } from './ncr-affairs-expert.model';
import { NCRTechnicalExpertCreateViewModel } from './ncr-technical-expert.model';
import { NCRNCSCreateViewModel } from './ncr-ncs-create.model';

export class NCRCreateViewModel{
    AuditPlanID:number;
    RequestID:number;
    MainTitle:string="On-site Assement informations";
    Title2:string="Initial assement GSO.2055.1";
    CompanyName:string;
    CompanyAddress:string;
    Number:number;
    AssessmentTeam:string;
    TechnicalAuditors:NCRTechnicalAuditorCreateViewModel[]=[];
    LeadAuditors:NCRLeadAuditorCreateViewModel[]=[];
    AffairsExperts:NCRAffairsExpertCreateViewModel[]=[];
    TechnicalExperts:NCRTechnicalExpertCreateViewModel[]=[];
    NCSs:NCRNCSCreateViewModel[]=[];
    
}