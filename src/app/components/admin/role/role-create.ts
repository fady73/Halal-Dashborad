import { RoleActionViewModel } from './role-action.model';

export class RoleCreateViewModel {
    ID: number = 0;
    NameArabic: string = "";
    NameEnglish: string = "";
    IsActive: boolean = true;
    // RedirectUrl: string = "";
    Actions: RoleActionViewModel[] = [];
}