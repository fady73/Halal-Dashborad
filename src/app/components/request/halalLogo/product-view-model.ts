import { AttachmentCreateViewModel } from 'src/app/shared/view-models/attachment-create.model';

export class ProductViewModel {
    ID: number;
ProductTypeID: number;
ProductTypeName: string
ImageURL:string
Notes: string
ProductHalalLogoID: number;
Attachments:AttachmentCreateViewModel[]
}
