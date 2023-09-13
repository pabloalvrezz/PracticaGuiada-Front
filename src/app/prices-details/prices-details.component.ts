import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

import { Observable } from 'rxjs';

import { Direction, FindRequest, Order, Page, PaginatedSearchComponent } from '../_helpers/search';
import { Prices } from '../_models/price';
import { Product } from '../_models/product';
import { ProductService } from '../_services/product.service';
import { PricesService } from '../_services/prices.service';

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
  price: Prices = new Prices();

  /**
   * Id del producto actual
   */
  id!: number;

  /**
   * Si el modo esta en verdadero se tratara de creacion de priceos
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

  /**
   * Cantidad total del precio
   */
  cuantity!: Number;

  /**
   * Producto asociado al precio
   */
  seleccionado?: Product;

  constructor(router: Router,
    translate: TranslateService,
    toastr: ToastrService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private priceService: PricesService) { super(router, translate, toastr); }

  toaster?: ToastrService;
  translat?: TranslateService;

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params: Params) => {
        this.id = params['id']
        
        // en el caso de que exista id significa que el usuario quiere editar el producto
        if (this.id) {
          this.createMode = false

          this.priceService.get(this.id).subscribe(
            ((price: Prices) => {
              this.price = price;
              this.price.cuantity.toFixed(2)
            })
            );
          }
          else {
            this.createMode = true;
          }
        }
    })
  }

  /**
   * Recupera los productos que se encuentran en la tabla productos
   *
   * @param findRequest
   * @returns un observable con todos los productos
   */
  protected override findInternal(findRequest: FindRequest): Observable<Page<Product>> {
    return this.productService.findAvaible(findRequest)
  }
  protected override removeInternal(entity: Product): Observable<{} | Response> {
    throw new Error('Method not implemented.');
  }
  protected override getDefaultOrder(): Order {
    return {
      property: 'id',
      direction: Direction.ASC,
    }
  }

  /**
   * Metodo para guardar los datos del precio
   */
  save(): void {
    let observable: Observable<Prices>;

    this.price.product = this.seleccionado

    if (this.createMode) observable = this.priceService.save(this.price);

    else observable = this.priceService.update(this.price);

    observable.subscribe({
      next: (price: Prices) => {
        if (this.createMode) {
          location.href = ('/main/prices')

        }
        else {
          location.href = ('/main/prices')
          this.price = price
        }
        this.toaster?.success(this.translat?.instant('toaster.success-saving', this.translat.instant('toaster.success')))
      },

      error: (error) => {
        console.log(error)
        this.toaster?.error(this.translat?.instant('toast.error-saving', this.translat?.instant('toast.error')));
      }
    })
  }


}