export class CompanyDetailsViewModel {
    constructor() {
        this.RequestAppendixIs = [];
    }
    ID: number;
    CompanyName: string;
    CompanyAddress: string;
    CompanyCountry: string;
    CompanyTypeName: string;
    StatusName: string;
    InvoiceAddress: string;
    TradelicenseNumber: string;
    IsPartGroup: boolean;
    GroupName: string;
    ManagmentRepresentative: string;
    Position: string;
    FoodSafetyManager: string;
    ApplicationDate: string;
    Email: string;
    CompanyType:number;
    TelephoneNumber: string;
    RequestAppendixIs: any[];
    IsActive: boolean;
    IsSelected = false;
}
