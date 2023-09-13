import { Product } from './../_models/product';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { ToastrService } from 'ngx-toastr';

import { Observable } from 'rxjs';

import {
  Direction,
  FindRequest,
  Order,
  Page,
  PaginatedSearchComponent,
} from '../_helpers/search';
import { ProductService } from '../_services/product.service';
import { LoginService } from '../_services/login.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'selector-name',
  templateUrl: 'searcher.component.html',
})
export class SearcherComponent
  extends PaginatedSearchComponent<Product>
{
  public showGoUpButton: boolean;
  public showScrollHeight = 400;
  public hideScrollHeight = 200;
  public isAdmin: boolean = false; // variable que controalra si el usuario es admin

  // array de categorias de los productos
  public types: Array<string> = ['JUGUETE', 'FRUTAS', 'VERDURAS', 'DECORACION', 'ROPA'];

  private lastPage = 5;
  private actualPage: number;
  
  constructor(
    router: Router,
    translate: TranslateService,
    toastr: ToastrService,
    public loginService: LoginService,
    public productService: ProductService,
  ) {
    super(router, translate, toastr);
    this.actualPage = 1;
    this.showGoUpButton = false;
  }
 
  protected override findInternal(
    findRequest: FindRequest
  ): Observable<Page<Product>> {
    return this.productService.searchActiveProducts(findRequest);
  }
  protected override removeInternal(
    entity: Product
  ): Observable<{} | Response> {
    return this.productService.toggle(entity);
  }
  protected override getDefaultOrder(): Order {
    return {
      property: 'id',
      direction: Direction.DESC,
    };
  }

  /**
   * Metodo que usaremos para cerrar la sesión del usuario
   */
  logOut(){
    // borraremos todos los datos almacenamos del usuario
    let data = ['access_token', 'current_user', 'refresh_token', 'username'];
    data.forEach(data => {
      localStorage.removeItem(data);
    })
    this.isAdmin = false
    this.loginService.logout()
  }

  /**
   * Metodo que usaremos para controlar el estado de las credenciales del usuario
   */
  statusChecked(): boolean{
    if(this.loginService.getCurrentUser()?.roles.includes('ADMINISTRATOR'))
    this.isAdmin = true

    if(this.isAdmin)
      return true
    return false
  }

  /**
   * Metodo que controlara el scroll del usuario
   */
  onScroll() {
    if (this.actualPage < this.lastPage) {
      this.actualPage++;
    }
  }

  /**
   * Metodo que controlara el boton para volver al principio de la pagina
   */
  scrollTop() {
    document.body.scrollTop = 0; // para el buscador safari
    document.documentElement.scrollTop = 0; // para cualquier otro buscador
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop) > this.showScrollHeight
    ) {
      this.showGoUpButton = true;
    } else if (
      this.showGoUpButton &&
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop) < this.hideScrollHeight
    ) {
      this.showGoUpButton = false;
    }
  }
}
