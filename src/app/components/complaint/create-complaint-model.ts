export class CreateComplaintModel {
    ComplaintID:number;
    ComplaintStatus:number;
    Comment:string;
}

export class ComplaintStatus
{
    Pending :number=0; 	

Approve :number=1;	

Decline :number=2;	


}