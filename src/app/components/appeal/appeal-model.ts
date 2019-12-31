import { AttachmentCreateViewModel } from 'src/app/shared/view-models/attachment-create.model';

export class AppealModel {
    constructor()
    {
        this.Attachments=[];
    }
 
    RequestID:number; 	
Message:string;
Attachments:AttachmentCreateViewModel[]=[];
ApproveStatus:boolean;
appealID:number;
	
}

