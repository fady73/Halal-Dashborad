import { ConsumerStatus } from './consumer-status.enum';

export class ConsumerViewModel {
    ID: number;
    Name: string;
    Status = ConsumerStatus.Pending;
    CompanyName: string;
    FirstName: string;
    LastName: string;
    CompanyCountry: string;
    CountryName: string;
    TypeName:string;
    ApplicationDate: string;
    CompanyTypeName: string;
    StatusName: string;
    Phone: string;
    Icon: string;
    BuyExchangeRate: number;
    SellExchangeRate: number;
    Balance: number;
    IsActive: boolean;
    IsSelected: boolean = false;
}