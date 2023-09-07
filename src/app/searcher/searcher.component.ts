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

@Component({
  selector: 'selector-name',
  templateUrl: 'searcher.component.html',
})
export class SearcherComponent
  extends PaginatedSearchComponent<Product>
  implements OnInit
{
  public showGoUpButton: boolean;
  showScrollHeight = 400;
  hideScrollHeight = 200;
  
  private lastPage = 5;
  private actualPage: number;
  private Productos?: Observable<Product>[];

  producto!: Product

  constructor(
    router: Router,
    translate: TranslateService,
    toastr: ToastrService,
    private productService: ProductService
  ) {
    super(router, translate, toastr);
    this.actualPage = 1;
    this.showGoUpButton = false;
  }

  ngOnInit(): void {
  }

  protected override findInternal(
    findRequest: FindRequest
  ): Observable<Page<Product>> {
    console.log(this.Productos?.length)
    return this.productService.searchProducts(findRequest);
  }
  protected override removeInternal(
    entity: Product
  ): Observable<{} | Response> {
    return this.productService.toggle(entity);
  }
  protected override getDefaultOrder(): Order {
    return {
      property: 'id',
      direction: Direction.ASC,
    };
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
    if (( window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop) > this.showScrollHeight) {
      this.showGoUpButton = true;
    } else if ( this.showGoUpButton &&
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop)
      < this.hideScrollHeight) {
      this.showGoUpButton = false;
    }
  }
}
