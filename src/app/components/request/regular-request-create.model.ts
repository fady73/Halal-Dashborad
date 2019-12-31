import { AttachmentCreateViewModel } from 'src/app/shared/view-models/attachment-create.model';
import { AdditionalSiteCreateViewModel } from './viewModels/additional-site-create.model';
import { BusinessConditionViewModel } from './viewModels/business-condition.model';
import { CattleBreedingCreateViewModel } from './cattle-breeding-create.mode';
import { VegetablesProducerCreateViewModel } from './vegetables-producer-create.model';
import { PoultryCreateViewModel } from './poultry-create.model';
import { ProductFamilyCreateViewModel } from './viewModels/product-family-create.model';

export class RegularRequestCreateViewModel {
    ID:number;
    RequestID:number;
    RegistrationScope:string;
    HaveLocalActivities:boolean=false;
    Exclusions:string;
    OutsourcedSpecialistOperations:string;
    ConsultancyRelatingDetails:string;
    TotalProductionLinesNumber:number;
    HACCPStudyTypeAndNumber:string;
    RawMaterials:string;
    OtherProductionLinesInformation:string;
    TotalEmployeesNumber:number;
    PermanentEmployeesCount:number;
    TemporaryEmployeesCount:number;
    ShiftNumber:number;
    SeasonalProductInformation:string;
    GrossAnnualTurnover:number;
    ProductionFloorArea:number;
    BusinessConditions:BusinessConditionViewModel[]=[];
    AdditionalSites: AdditionalSiteCreateViewModel[] = [];
    ScopeAttachments: AttachmentCreateViewModel[] = [];
    CattleBreedings:CattleBreedingCreateViewModel[]=[]
    Poultries:PoultryCreateViewModel[]=[];
    VegetablesProducers:VegetablesProducerCreateViewModel[]=[];
    ProductFamilies:ProductFamilyCreateViewModel[]=[]
}