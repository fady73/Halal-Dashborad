import { Component, OnInit } from '@angular/core';
import { AlertType, Alert } from './alert.model';
import { NotificationsService } from 'angular2-notifications';
import { AlertService } from './alert.service';
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.css']
})

export class AlertComponent {
    alerts: Alert[] = [];
 
    constructor(private alertService: AlertService,
        private _notificationsService: NotificationsService
        ) { }
 
    ngOnInit() {
        this.alertService.getAlert().subscribe((alert: Alert) => {
            //this.createNotify("kkkk",true);
            if (alert!=null) {
                this.createAlert(alert.message,alert.type);
                // clear alerts when an empty alert is received
                this.alerts = [];
                //this.createNotify("kkkk",true);
                return;
            }
 
            // add alert to array
            this.alerts.push(alert);
        });
    }
 
    removeAlert(alert: Alert) {
        this.alerts = this.alerts.filter(x => x !== alert);
    }
    createAlert(message:string,type:AlertType) {
        if(type==AlertType.Success)
        {
          this._notificationsService.success(
            message,
             "",
            {
              timeOut: 4000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: true,
              maxLength: 3
            }
          );
        }
        if(type==AlertType.Error)
        {
          this._notificationsService.error(
            message,
             "",
            {
              timeOut: 2000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: true,
              maxLength: 3
            }
          );
        }
        
      }
    createNotify(message:string,isSuccess:boolean=true) {
        if(isSuccess)
        {
          this._notificationsService.success(
            message,
             "",
            {
              timeOut: 2000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: true,
              maxLength: 3
            }
          );
        }
        else
        {
          this._notificationsService.error(
            message,
             "",
            {
              timeOut: 2000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: true,
              maxLength: 3
            }
          );
        }
        
      }
    cssClass(alert: Alert) {
        if (!alert) {
            return;
        }
 
        // return css class based on alert type
        switch (alert.type) {
            case AlertType.Success:
                return 'alert alert-success';
            case AlertType.Error:
                return 'alert alert-danger';
            case AlertType.Info:
                return 'alert alert-info';
            case AlertType.Warning:
                return 'alert alert-warning';
        }
    }
}