import { UserRoleViewModel } from '../user/user-role.model';
export enum Division {
    Registration=0,
    Audit=1,
    DecisionCommittee=2,
    Administration=3
}
export class EmployeeCreateViewModel {
    ID: number = 0;
    FirstName: string = "";
    LastName: string = "";
    Phone: string = "";
    Email: string = "";
    JobID: number = 1;
    Role: number;
    IsActive: boolean = true;
    Division:Division
}