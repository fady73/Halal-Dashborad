export enum ApproveStatus{
    Approve=0,
    Decline=1,
    PostPone=2
}
export class RequestCommitteeDecisionCreate {
    ID:number;
    ApproveStatus:ApproveStatus
    Note:string;
    RequestID:number;
}
