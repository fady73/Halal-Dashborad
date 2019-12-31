export class RoleViewModel {
    ID: number;
    Name: string;
    Icon: string;
    BuyExchangeRate: number;
    SellExchangeRate: number;
    Balance: number;
    IsActive: boolean;
    IsDeleting: boolean = false;
    IsSelected: boolean = false;
}