import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { LoginService } from '../_services/login.service';
import { Product } from '../_models/product';
import { HttpClient } from '@angular/common/http';
import { Helper } from '../_helpers/utils';

/**
 * Guard para controlar el acceso a las páginas seguras.
 * En caso de no estar logado redirige al login.
 */
@Injectable({
  providedIn: 'root',
})
export class EnabledGuard implements CanActivate {
  constructor(
    private router: Router,
    private loginService: LoginService,
    private httpClient: HttpClient
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let aux = Number.parseFloat(next.paramMap.get('id')!);

    this.get(aux).subscribe((product) => {
      if (this.loginService.getCurrentUser()?.roles.includes('ADMINISTRATOR')) {
        return true;
      } else {
        if (product.enabled) return true;
        else {
          this.router.navigate(['/search']);
          return false;
        }
      }
    });

    return true;
  }

  /**
   * Obtiene los datos del producto
   */
  get(id: number): Observable<Product> {
    return this.httpClient.get<Product>(Helper.getUrl('/product/' + id));
  }
}
