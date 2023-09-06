import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { ToastrService } from 'ngx-toastr';

import { Observable } from 'rxjs';
import {
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
export class SearcherComponent extends PaginatedSearchComponent<Product> {
  //variables para controlar el infinite scroll
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
  }

  protected override findInternal(
    findRequest: FindRequest
  ): Observable<Page<Product>> {
    return this.productService.searchProducts(findRequest);
  }
  protected override removeInternal(
    entity: Product
  ): Observable<{} | Response> {
    throw new Error('Method not implemented.');
  }
  protected override getDefaultOrder(): Order {
    throw new Error('Method not implemented.');
  }

  /**
   * Metodo que usaremos para controlar el scroll infinito
   */
  onScroll(){
    if(this.actualPage < this.lastPage){
      this.actualPage++;
    }
  }
}
