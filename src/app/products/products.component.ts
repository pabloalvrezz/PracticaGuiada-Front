
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { ToastrService } from 'ngx-toastr';

import { Observable } from 'rxjs';

import { Direction, FindRequest, Order, Page, PaginatedSearchComponent } from '../_helpers/search';
import { Product } from '../_models/product';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent extends PaginatedSearchComponent<Product> {

  constructor(router: Router,
    translate: TranslateService,
    toastr: ToastrService,
    private productService: ProductService) { super(router, translate, toastr); }

  protected override findInternal(findRequest: FindRequest): Observable<Page<Product>> {
    return this.productService.searchProducts(findRequest);
  }

  protected override removeInternal(entity: Product): Observable<{} | Response> {
    return this.productService.toggle(entity);
  }

  protected override getDefaultOrder(): Order {
    return {
      property: 'id',
      direction: Direction.ASC
    }
  }


}
