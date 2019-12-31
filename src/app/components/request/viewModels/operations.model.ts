import { AttachmentCreateViewModel } from './../../../shared/view-models/attachment-create.model';
export class OperationsViewModel {
    constructor() {
        this.Attachments = [];
    }
    RequestID: number;
    OperationsDetails: string;
    Attachments: AttachmentCreateViewModel[] = [];
    IsActive: boolean;
    IsSelected = false;
}
