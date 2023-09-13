import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { ProductService } from '../_services/product.service';
import { Product } from '../_models/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'searcher-details',
  templateUrl: 'searcher-details.component.html',
})
export class SearcherDetailsComponent implements OnInit {
  product: Product = new Product();

  public productId!: number;

  description: string | null = '';

  stock!: number;

  price?: number;

  /**
   * Variables usadas para controlar el toast del carrito de la compra
   */

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastrService: ToastrService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productId = +this._route.snapshot.paramMap.get('id')!;
    this.description = '';
    this.stock = 0;

    this.route.params.subscribe({
      next: (params: Params) => {
        this.productId = params['id'];
        if (this.productId) {
          this.productService
            .get(this.productId)
            .subscribe((product: Product) => {
              this.product = product;
            });
        } else {
          console.log('Error');
        }
      },
    });
  }

  /**
   * Metodo usado para controlar la notificación a la hora
   * de pulsar el boton de comprar
   */
  public showSuccess(): void {
    let observable: Observable<Product>;
    this.product.stock--;
    observable = this.productService.update(this.product);

    observable.subscribe({
      next: () => {
        if (this.product.stock === 0) {
          this.toastrService.error('El producto seleccionado se ha quedado sin stock');
        } else {
          this.toastrService.success(
            'Producto añadido al carrito correctamente'
          );
        }
      },
    });
  }
}
