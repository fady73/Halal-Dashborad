import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { ChartjsModule } from '@ctrl/ngx-chartjs';

const routes:Routes=[
  {path:'',component:DashboardComponent}
];
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,ChartjsModule,RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
