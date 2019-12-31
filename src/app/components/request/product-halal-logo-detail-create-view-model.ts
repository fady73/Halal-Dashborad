import { ProductHalalDetailCreateViewModel } from './product-halal-detail-create-view-model';
import { HalalLogoStatus } from './pending.enum';

export class ProductHalalLogoDetailCreateViewModel {
    ID:	number
    Status:	HalalLogoStatus
    Fees:	number 
    RejectionReason	:string
    RequestID	:number
    ProductHalalLogoID:number;
    Details:ProductHalalDetailCreateViewModel[]=[]
}
