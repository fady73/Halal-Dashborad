import { NCCloseStatusEnum } from '../ncs-close-status-enum';
import { PathDocument } from './path-document';

export class NCRNCSCreateViewModel {
    ID: number;
    NCRID: number;
    Date: Date = new Date();
    StandardClause: string;
    Description: string;
    Analysis: string;
    AssessorID: number;
    CABAcceptance: boolean = false;
    CorrectiveAction: string = "";
    ImplementationPeriod: Date = new Date();
    CorrectiveActionEvaluation: string = "";
    SuppliedDocuments:PathDocument[]=[];
    NCCloseStatus: NCCloseStatusEnum ;
    NextAssessment: string = "";
    FinalComment: string = "";
    Status:number=0;
    StatusName:string="";
    DeclineReason:string="";
    expanded: boolean = false;
}