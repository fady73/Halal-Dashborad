import { PageEnum } from './page-enum.enum';
import { RoleActionViewModel } from './role-action.model';

export class RolePageViewModel
{
    ID:PageEnum;
    Name:string="";
    Icon:string="";
    IsActive:boolean=true;
    IsSelected:boolean=false;
    IsDeleting:boolean=false;
    Actions:RoleActionViewModel[]=[];
}