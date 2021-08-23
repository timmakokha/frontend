import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {LocalStorageService} from "./localStorage.service";
import {DashboardComponent} from "../../../../../apps/admin/src/app/pages/dashboard/dashboard.component";


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  constructor(private route:Router, private localStorageService: LocalStorageService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.localStorageService.getToken();
    if(token){
      const decodeToken = JSON.parse(atob(token.split(".")[1]))
      if(decodeToken.isAdmin && !this._checkExpired(decodeToken.exp))
        return true
    }
    this.route.navigate(['/login'])
    return false
  }

  private _checkExpired(expirely:any): boolean{
    return Math.floor(new Date().getTime() / 1000) >= expirely
  }
}
