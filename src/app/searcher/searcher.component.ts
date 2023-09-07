import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

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
import { Product } from '../_models/product';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'selector-name',
  templateUrl: 'searcher.component.html',
})
export class SearcherComponent
  extends PaginatedSearchComponent<Product>
  implements OnInit
{
  public numbers!: Array<Number>;
  public showGoUpButton: boolean;
  showScrollHeight = 400;
  hideScrollHeight = 200;

  private lastPage = 5;
  private actualPage: number;


  
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
    this.numbers = new Array<number>();
    this.addNumbers();
  }

  protected override findInternal(
    findRequest: FindRequest
  ): Observable<Page<Product>> {
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
   * Metodo usado para renderizar los números
   */
  addNumbers() {
    let number = 0;
    let numberCounter = this.numbers.length;

    for (let i = 0; i < 40; i++) {
      this.numbers.push(number + numberCounter);
      number++;
      numberCounter++;
    }
  }

  /**
   * Metodo que controlara el scroll del usuario
   */
  onScroll() {
    if (this.actualPage < this.lastPage) {
      this.addNumbers();
      this.actualPage++;
    } else console.log('NO hay mas números');
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
