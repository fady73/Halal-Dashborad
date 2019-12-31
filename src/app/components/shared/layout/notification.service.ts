import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private apiService: ApiService) { }
  GetNotification() {
    return this.apiService.get(`/Notification/GetNotifications`)
  }
  PostNotification( NotificationID:number  ) {
    return this.apiService.post( `/Notification/NotificationVisited?notificationID`, NotificationID );
  }
  GetDashboard(){
    return this.apiService.get( `/Dashboard/GetRequestsStatistics` );

  }
  
}
