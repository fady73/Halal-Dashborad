import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../shared/layout/notification.service';
import { CrudService } from 'src/app/shared/services/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap';
import { environment } from './../../../../../environments/environment.prod';

@Component({
  selector: 'app-show-notification',
  templateUrl: './show-notification.component.html',
  styleUrls: ['./show-notification.component.css']
})
export class ShowNotificationComponent implements OnInit {
  Notification:Notification[]=[];
  pageIndex: number = 1;
  pageSize: number = 10;
  spinner: any;
  constructor(private _notification:NotificationService,
    private _crudService: CrudService,
    //private _branchService: BranchService,
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private route:Router) { }
    p: number = 1;

  ngOnInit() {
    this._notification.GetNotification().subscribe(data=>{
      this.Notification=data.Data;

    })
    

  }
  

  

}
