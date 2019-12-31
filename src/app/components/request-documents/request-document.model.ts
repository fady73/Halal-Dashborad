import { AttachmentCreateViewModel } from './../../shared/view-models/attachment-create.model';
export class RequestDocumentViewModel {
    ID: number = 0;
    RequestID: number = 0;
    RequiredDocumentID: number = 0;
    RequiredDocumentName: string;
    Attachments: AttachmentCreateViewModel[] = [];
    Valid: boolean = false;
    Notes: string = " ";
    IsFinalNoteSelected:false;
}