import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductHalalLogoDetailCreateViewModel } from '../../product-halal-logo-detail-create-view-model';
import { AlertService } from 'src/app/components/alert/alert.service';
import { RequestService } from '../../request.service';
import { CrudService } from 'src/app/shared/services/crud.service';
import { AttachmentService } from 'src/app/shared/services/attachment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductHalalDetailCreateViewModel } from '../../product-halal-detail-create-view-model';
import { AttachmentCreateViewModel } from 'src/app/shared/view-models/attachment-create.model';
import { HalalLogoStatus } from '../../pending.enum';
import { BsModalRef } from 'ngx-bootstrap';
import { ProductViewModel } from '../product-view-model';

@Component({
  selector: 'app-halallogo',
  templateUrl: './halallogo.component.html',
  styleUrls: ['./halallogo.component.css']
})
export class HalallogoComponent implements OnInit {
  Model:ProductHalalLogoDetailCreateViewModel;
  item:ProductHalalDetailCreateViewModel;
  ProductViewModel:ProductViewModel[]=[]
  modalRef: BsModalRef;
  @ViewChild( 'cancelTemplate', { static: false } ) cancelTemplate: any;
  @ViewChild( 'acceptTemplate', { static: false } ) acceptTemplate: any;

  constructor( 
    private _requestService: RequestService,
    private _alertService: AlertService,
    private _crudService: CrudService,
    private _attachmentService: AttachmentService,
    private _activatedRoute: ActivatedRoute,
    
    private _router: Router) { 
      this.Model=new ProductHalalLogoDetailCreateViewModel();
      this.item=new ProductHalalDetailCreateViewModel();
      this.item.Attachments=new AttachmentCreateViewModel();
    }
  ngOnInit() {
    this._activatedRoute.paramMap.subscribe( params => {
      console.log(params.get( 'id' ));
      this.Model.RequestID=+params.get('id');
      this._requestService.getHalalLogoRegest(+params.get('id')).subscribe(e=>
        {
        this.ProductViewModel=e.Data;
        console.log(this.ProductViewModel)

        })
     });
     
  }
  accept(){
    this.Model.ID=1;
    // this.Model.RequestID=
    this.Model.Status=HalalLogoStatus.Confirmed;
    this._requestService.acceptLogo(this.Model).subscribe(e=>{
      console.log(this.Model)
      console.log(e)
      this._router.navigateByUrl(`/request/index`)
    })
  }
  rejectModel(){
      this.modalRef = this._crudService.modalService.show( this.cancelTemplate, { class: 'modal-md' } );
  }
  acceptModel(){
    this.modalRef = this._crudService.modalService.show( this.acceptTemplate, { class: 'modal-md' } );
}
  Reject(){
    this.Model.Status=HalalLogoStatus.Rejected;
    this._requestService.acceptLogo(this.Model).subscribe(e=>{
      this._router.navigateByUrl(`/request/index`)
    })
  }

}
