import { AttachmentCreateViewModel } from './../../../shared/view-models/attachment-create.model';
import { AdditionalSiteCreateViewModel } from './additional-site-create.model';
import { TimeScaleViewModel } from './time-scale.model';
import { BusinessConditionViewModel } from './business-condition.model';
import { SalesViewModel } from './sales.model';
export class ScopeProcessesViewModel {
    constructor() {
        this.ScopeAttachments = [];
    }
    RequestID: number;
    RegistrationScope: string;
    Exclusions: string;
    SpecialistOperations: string;
    OutsourcedSpecialistOperations: string;
    ConsultancyRelatingDetails: string;
    TotalProductionLinesNumber: number;
    HACCPStudyTypeAndNumber: string;
    RawMaterials: string;
    OtherProductionLinesInformation: string;
    TotalEmployeesNumber: number;
    PermanentEmployeesCount: number;
    TemporaryEmployeesCount: number;
    ShiftsNumber: number;
    SeasonalProductInformation: string;
    GrossAnnualTurnover: string;
    ProductionFloorArea: number;
    ProductFamilies: [];
    AdditionalSites: AdditionalSiteCreateViewModel[] = [];
    BusinessConditions: BusinessConditionViewModel[] = [];
    TimeScales: TimeScaleViewModel[] = [];
    MarketingCountries: [];
    ScopeAttachments: AttachmentCreateViewModel[] = [];
    CattleBreedings: [];
    Poultries: [];
    VegetablesProducers: [];
    IsActive: boolean;
    IsSelected = false;
}


export class RecognitionRequestCreateViewMode{

    RequestID:number;
    RegistrationScope:string="";
    Exclusions:string;
    SpecialistOperations:string;
    ConsultancyRelatingDetails:string;
    TotalEmployeesNumber:number;
    TotalContractualEmployeesNumber:number;
    CertificationsCount:number;
    TotalAnnualRevenue:number;
    HaveLocalActivities:boolean=false;
    CertificateCountries:SalesViewModel;

}
