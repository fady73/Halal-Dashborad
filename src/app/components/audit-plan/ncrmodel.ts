import { PeopleAuditorsViewModel } from './people-auditors-view-model';
import { Ncss } from './ncss';

export class Ncrmodel {

AuditPlanID: number;
Number:number;
CompanyName: string;
CompanyAddress: string;
AssessmentTeam: string;
AssessmentDates:Date []=[];
TechnicalAuditors:PeopleAuditorsViewModel[];
LeadAuditors: PeopleAuditorsViewModel[];
AffairsExperts: PeopleAuditorsViewModel[];
TechnicalExperts: PeopleAuditorsViewModel[];
NCSs:Ncss []
}

