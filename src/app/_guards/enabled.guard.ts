import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';

import { LoginService } from '../_services/login.service';
import { Observable} from 'rxjs';
import { Product } from '../_models/product';
import { ToastrService } from 'ngx-toastr';

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
    private toastrService: ToastrService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }

  /**
   * Metodo que usaremos para comprobar el estado del producto y si
   * el usuario es administrador o no
   *
   * @param producto
   *
   * @returns boolean
   */
  checkProduct(product: Product): boolean {
    // si es administrador siempre le dejaremos pasar
    if (this.loginService.getCurrentUser()?.roles.includes('ADMINISTRATOR'))
    return true;
    // en caso de que no lo sea comprobaremos si el producto esta habilitado y que tenga stock
    else {
      if (product.enabled && product.stock > 0) {
        return true;
      } 
      // en caso de que no este no le dejaremos pasar
      else {
        this.toastrService.success(
          'Producto añadido al carrito correctamente'
        );
        this.router.navigate(['/search']);
        return false;
      }
    }
  }
}
