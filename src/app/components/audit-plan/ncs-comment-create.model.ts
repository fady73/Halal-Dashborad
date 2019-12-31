import { NCCloseStatusEnum } from './ncs-close-status-enum';

export class NCSCommentCreateViewModel {
    NCSID: number;
    NextAssessment: string = "";
    FinalComment: string = "";
    CorrectiveActionEvaluation: string = "";
    NCCloseStatus : NCCloseStatusEnum = 0;
    Status:number=0;
    StatusName:string="";
    DeclineReason:string="";
}