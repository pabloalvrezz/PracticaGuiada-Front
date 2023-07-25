import { Component } from '@angular/core';
import { Direction, FindRequest, Order, Page, PaginatedSearchComponent } from '../_helpers/search';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../_services/product.service';
import { Product } from '../_models/product';
import { Price } from '../_models/price';

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
