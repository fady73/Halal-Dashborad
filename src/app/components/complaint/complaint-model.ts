import { AttachmentCreateViewModel } from 'src/app/shared/view-models/attachment-create.model';

export class ComplaintModel {
    ID:number;
    CompanyName:string;
    ComplaintStatus:number;
    Content:string;
    ComplaintDocuments: AttachmentCreateViewModel[]=[];
}

