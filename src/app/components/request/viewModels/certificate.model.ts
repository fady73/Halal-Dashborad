import { AttachmentCreateViewModel } from './../../../shared/view-models/attachment-create.model';
export class CertificateViewModel {
    constructor() {
        this.CompanyCertifications = [];
        this.PreviousAuditAttachments = [];
    }
    ID: number;
    RequestID:number;
    CertificateType: string;
    CertificationBody:string;
    CertificateDescription: string;
    CompanyCertified: boolean;
    PreviousAudit: string;
    CertificateFilePath:string;
    CompanyCertifications: any[];
    PreviousAuditAttachments: AttachmentCreateViewModel[] = [];
    IsActive: boolean;
    IsSelected = false;
}
