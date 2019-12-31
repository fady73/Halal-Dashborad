import { NCRNCSCreateViewModel } from './ncr/ncr-ncs-create.model';
import { AuditReportRequirementCreateViewModel } from './audit-report-requirement-create-view.model';
import { AttachmentCreateViewModel } from 'src/app/shared/view-models/attachment-create.model';

export class AuditReportSection3CreateViewModel {
    ID: number = 0;
    RequestID: number = 0;
    StrengthPoints: string = "";
    Recommendation: number = 0;
    Notes: string = "";
    NSCs: NCRNCSCreateViewModel[];
    AuditReportRequirements: AuditReportRequirementCreateViewModel[];
    AuditPdfAttachments: AttachmentCreateViewModel[] = [];

}