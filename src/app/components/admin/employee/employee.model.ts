import { UserRoleViewModel } from '../user/user-role.model';
import { Division } from './employee-create.model';
import { DivisionView } from './division-view';

export class EmployeeViewModel{
    ID:number;
    Code:string;
    Password:string;
    Name:string;
    BranchName:string;
    IsActive:boolean;
    Roles:UserRoleViewModel[]=[];
    IsSelected:boolean=false;
    IsDeleting:boolean=false;
    Division:Division;
    // DivisionName:string;

}