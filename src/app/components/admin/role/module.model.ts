import { RolePageViewModel } from './role-page-model';

export class ModuleViewModel
{
    ID:number;
    Name:string;
    Icon:string;
    Url:string;
    Pages:RolePageViewModel[]=[];
}