import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../_services/login.service';

/**
 * Guard para controlar el acceso a las páginas seguras.
 * En caso de no estar logado redirige al login.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.loginService.isLoggedIn()) {
      // only admin users can activate the route
      if(this.loginService.getCurrentUser()?.roles.includes('ADMINISTRATOR'))
      // logged as admin so return true
        return true;
        this.router.navigate(['/search']);
      return false;
    } else {
      // not logged in so redirect to login page
      this.router.navigate(['/search']);
      return false;
    }
  }

}
