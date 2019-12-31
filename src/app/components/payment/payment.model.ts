export class PaymentViewModel {
    ID: number;
    RequestID: number;
    PaymentDate: Date;
    UploadByConsumerDate: string;
    ConfirmedByAdminDate: string;
    RejectedByAdminDate: string;
    Confirmed = false;
    Name: string;
    Status: number;
    Type: number;
    CompanyName: string;
    CountryName: string;
    TypeName:string;
    CompanyCountry: string;
    ApplicationDate: string;
    AssignedEmployee: string;
    CompanyTypeName: string;
    FilePath: string;
    StatusName: string;
    RequestStatusName: string;
    Icon: string;
    BuyExchangeRate: number;
    SellExchangeRate: number;
    Balance: number;
    IsActive: boolean;
    IsSelected: boolean = false;
}