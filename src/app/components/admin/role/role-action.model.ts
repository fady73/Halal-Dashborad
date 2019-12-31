import { PageEnum } from './page-enum.enum';
import { ActionEnum } from './action-enum.enum';

export class RoleActionViewModel
{
    ID:number;
    RoleID:number;
    RoleName:string;
    PageID:PageEnum;
    PageName:string;
    ActionID:ActionEnum;
    ActionName:string;
    IsSelected:boolean=false;

}