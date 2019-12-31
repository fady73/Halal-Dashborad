import { CityAccountViewModel } from './city-account.model';

export class CityCreateViewModel {
    ID: number = 0;
    NameArabic: string = "";
    NameEnglish: string = "";
    IsActive: boolean = true;
    Code: string = "";
    BranchID: number;
    CityAccounts: CityAccountViewModel[] = [];
}