import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../shared/layout/notification.service';
import { ResultViewModel} from './Dashboard'
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import * as Chart from 'chart.js';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  item:ResultViewModel=new ResultViewModel();
  constructor(private _notifcaition:NotificationService) {
    this._notifcaition.GetDashboard().subscribe(date=>{
      this.item=date.Data

    })
    
   
    }

  ngOnInit() {
    

    this.loadScript("/assets/js/chart.js");
  }
  public loadScript(url: string) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
    //alert("loaded");

  }

  
}
