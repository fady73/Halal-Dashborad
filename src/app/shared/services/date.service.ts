import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }
  getTomorrowDate():Date
  {
    let currentDate=new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    return currentDate;
  }
  getFirstDayCurrentMonth():Date
  {
    let currentDate=new Date();
    return new Date(currentDate.getFullYear(),currentDate.getMonth(),1);
  }
}
