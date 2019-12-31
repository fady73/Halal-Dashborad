import { ColumnViewModel } from './column-view-model';
import { environment } from './../../../environments/environment.prod';
import { FormGroup } from '@angular/forms';
import { ResultViewModel } from './result-view-models';

export class CRUDIndexPage{
    seachForm:FormGroup;
    isSearching: boolean = true;
    isLoading: boolean = false;
    isUploading: boolean = false;
    isSaving: boolean = false;
    resultViewModel: ResultViewModel;
    isPageLoaded: boolean = false;
    term: string = "";
    orderBy: string = "ID";
    isAscending: boolean = false;
    isAllSelected: boolean = false;
    selectedAll:boolean=false;
    columns: ColumnViewModel[];
    options = { itemsPerPage: environment.pageSize, currentPage: 1, id: 'Pagination', totalItems: 0, totalPages: 0 }
  
}