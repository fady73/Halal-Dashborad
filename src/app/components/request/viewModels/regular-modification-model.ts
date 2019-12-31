import { AttachmentCreateViewModel } from 'src/app/shared/view-models/attachment-create.model';
import { ProductFamilyCreateViewModel } from './product-family-create.model';

export class RegularModificationModel {
    ProductCategoriesIDs:number[]=[];
 
    RequestID: number;
  
    RegistrationScope: string;
    Exclusions:string;

    TotalProductionLinesNumber: number;
    HACCPStudyTypeAndNumber: string;
 
    HaveLocalActivities:boolean=false;
 
    Attachments: AttachmentCreateViewModel[] = [];
    ScopeAttachments: AttachmentCreateViewModel[] = [];
    ProductFamilies: ProductFamilyCreateViewModel[] = []
}
