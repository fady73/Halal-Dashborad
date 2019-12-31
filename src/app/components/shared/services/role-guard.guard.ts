import { PageEnum } from './../../admin/role/page-enum.enum';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActionEnum } from '../../admin/role/action-enum.enum';
import { UserService } from '../../admin/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router:Router,private _userService:UserService)
  {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return true;
      let page = next.data["page"] as PageEnum;
      let action = next.data["action"] as ActionEnum;
      let hasRole=this._userService.isUserHasRoleAction(page,action);
     if(hasRole)
      return true;
      else{
        this.router.navigateByUrl('not-authorized');
      }
  }
}
