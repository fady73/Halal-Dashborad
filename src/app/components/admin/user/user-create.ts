import { UserRoleViewModel } from './user-role.model';

export class UserCreateViewModel
{
    ID:number=0;
    // Code:string="";
    Name:string="";
    Mobile:string="";
    Email:string="";
    Password:string="";
    Notes:string="";
    IsActive:boolean=false;
    Roles:UserRoleViewModel[]=[];
}