import { Page } from 'src/app/shared/view-models/page.model';
import { PaymentViewModel } from './../../payment/payment.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../payment/payment.service';

@Component( {
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
} )
export class PaymentsComponent implements OnInit {
  page: Page = new Page();
  items: PaymentViewModel[];
  payment1: PaymentViewModel = new PaymentViewModel();
  payment2: PaymentViewModel = new PaymentViewModel();
  payment3: PaymentViewModel = new PaymentViewModel();
  requestID: number;
  constructor(
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.initializePage();
  }

  initializePage() {
    this.activatedRoute.paramMap.subscribe( params => {
      if ( params.has( 'id' ) ) {
        this.requestID = +params.get( 'id' );
      }
      this.page.isLoading = true;
      this.paymentService.GetRequestPayments( this.requestID ).subscribe( response => {
        if ( response.Success ) {
          this.items = response.Data;
          this.items.forEach( item => {
            if ( item.Type == 0 ) {
              this.payment1 = item
            }
            if ( item.Type == 1 ) {
              this.payment2 = item
            }
            if ( item.Type == 2 ) {
              this.payment2 = item
            }
          } )
          if(this.items.length==0){
            this.payment1 = new PaymentViewModel();
            this.payment2 = new PaymentViewModel();
            this.payment3 = new PaymentViewModel();
          }
          if(this.items.length==1){
            this.payment2 = new PaymentViewModel();
            this.payment3 = new PaymentViewModel();
          }
          if(this.items.length==2){
            this.payment3 = new PaymentViewModel();
          }
          this.page.isLoading = false;
        }
      }, null, () => {
        this.page.isPageLoaded = true;
      } );
    } );
  }

}
