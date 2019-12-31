import { AttachmentCreateViewModel } from '../../shared/view-models/attachment-create.model';
import { RequestDocumentViewModel } from './request-document.model';
export class ReviewDocumentViewModel {
    ID: number = 0;
    Documents: RequestDocumentViewModel[] = [];
    Notes: string = " ";
    IsFinalNoteSelected: boolean;
}