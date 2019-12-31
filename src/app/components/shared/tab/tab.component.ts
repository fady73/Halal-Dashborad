import { Component, Input, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'shipping-tab',
    templateUrl: 'tab.component.html'
})
export class ShippingTabComponent implements OnInit {
    @Input() activeTab: string ;

    constructor() {
    }
    ngOnInit(): void {
    }
    ngOnChange(){
    }

}
