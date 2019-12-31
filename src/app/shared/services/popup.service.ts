import { Injectable } from '@angular/core';

@Injectable({
    providedIn : 'root'
})
export class PopupService{

    show(message:string,obj:{}){
        alert(message + JSON.stringify(obj));
    }
}