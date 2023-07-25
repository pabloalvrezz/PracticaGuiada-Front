import { Component, OnInit } from '@angular/core';
import { Price } from '../_models/price';
import { FindRequest, Order, Page, PaginatedSearchComponent } from '../_helpers/search';
import { Product } from '../_models/product';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-prices-details',
  templateUrl: './prices-details.component.html',
  styles: [
  ]
})
export class PricesDetailsComponent extends PaginatedSearchComponent<Product> implements OnInit {
  /**
   * Precio actual
  */
  price: Price = new Price();

  /**
   * Si el modo esta en verdadero se tratara de creacion de productos
  */
  createMode: boolean = true;

  /**
   *Fecha de inicio del precio
   */
  startDate!: Date;

  /**
   *Fecha de fin del precio
   */
  endDate!: Date;

  constructor(router: Router,
    translate: TranslateService,
    toastr: ToastrService,
    private productService: ProductService) { super(router, translate, toastr); }

  ngOnInit(): void {
  }

  protected override findInternal(findRequest: FindRequest): Observable<Page<Product>> {
    return this.productService.searchProducts(findRequest);
  }
  protected override removeInternal(entity: Product): Observable<{} | Response> {
    throw new Error('Method not implemented.');
  }
  protected override getDefaultOrder(): Order {
    throw new Error('Method not implemented.');
  }

  /**
   * Metodo para guardar los datos del prrecio
   */


}
