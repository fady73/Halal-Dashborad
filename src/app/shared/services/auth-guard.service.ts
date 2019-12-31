import { CanActivate, Router, CanActivateChild } from "@angular/router";
import { Injectable } from "@angular/core";
import { TokenService } from "./token.service";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate,CanActivateChild {
    canActivateChild(childRoute: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        return this.canActivate();
    }
    constructor(private router: Router, private tokenService: TokenService) { }
    
    canActivate(): boolean {
        //return true;
        let logged = this.tokenService.hasAccessToken();
        if (logged)
            return true;
        else {
        //   alert(`no token ${environment.api_url}`)
            this.router.navigateByUrl('/login');
         //   window.open(`https://takhfeed.mohamed-sadek.com/login?ReturnUrl=Admin`,"_self");
            //window.open(`${environment.takhfeed_url}/login?ReturnUrl=Admin`,"_self");
            
            return false;
        }

    }

}