import { FormGroup } from '@angular/forms';
import { ResultViewModel } from './result-view-models';

export class CRUDCreatePage{
    form: FormGroup;
    isSerching: boolean = false;
    isUploading: boolean = false;
    isEdit: boolean = false;
    isSaving: boolean = false;
    isDeleting: boolean = false;
    resultViewModel: ResultViewModel;
    isPageLoaded: boolean = false;
}