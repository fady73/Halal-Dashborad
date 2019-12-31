import { ConsumerRequiredAction } from './consumer-required-action.enum';
import { StaffRequiredAction } from './staff-required-action.enum';
import { EmployeeViewModel } from './employee.model';

export class RequestViewModel {
    ID: number;
    Name: string;
    Status: number;
    CompanyName: string;
    ConsumerName: string
    CompanyAddress: string;
    AssignedEmployeeID;
    AssignedEmployees: EmployeeViewModel[]=[];
    CompanyCountry: string;
    ApplicationDate: string;
    CompanyTypeName: string;
    CertificateTypeName: string;
    CertificateDate:string;
    SuspensionEndDate:string;
    SuspensionStartDate:string;
    StatusName: string;
    Email: string;
    TelephoneNumber: string;
    Icon: string;
    BuyExchangeRate: number;
    SellExchangeRate: number;
    Balance: number;
    IsActive: boolean;
    ConsumerRequiredAction = ConsumerRequiredAction.None;
    ConsumerRequiredActionName = "";
    StaffRequiredAction = StaffRequiredAction.None;
    StaffRequiredActionName = "";
    IsSelected: boolean = false;
    RequestCancellationStatus:number;

}