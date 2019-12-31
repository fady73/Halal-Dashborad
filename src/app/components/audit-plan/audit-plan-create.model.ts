import { AffairsExpertCreateViewModel } from './affairs-expert-create-model';
import { LeadAuditorCreateViewModel } from './lead-auditor-create-model';
import { TeamMemberCreateViewModel } from './team-member-create-model';
import { AdditionalAttendeeCreateViewModel } from './additional-attendee-create.model';
import { VisitCreateViewModel } from './visit-create-model';

export class AuditPlanCreateViewModel
{
    ID:number;
    RequestID:number;
    Version:number = 0;
    ApplicationTitle:string="Hala Aduit Plan";
    ConsumerName:string;
    Address:string;
    VisitNumber:number;
    AuditDate:Date=new Date();
    AuditLanguage:number=1;
    ModificationReasons:string;
    Standards:string;
    Scope:string;
    Objectives:string;
    AdditionalNote:string;
    TeamMembers:TeamMemberCreateViewModel[]=[];
    LeadAuditors:LeadAuditorCreateViewModel[]=[];
    AffairsExperts:AffairsExpertCreateViewModel[]=[];
    AdditionalAttendees:AdditionalAttendeeCreateViewModel[]=[];
    Visits:VisitCreateViewModel[]=[];
    

}