import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { ProductService } from '../_services/product.service';
import { Product } from '../_models/product';
import { Observable } from 'rxjs';
import { EnabledGuard } from '../_guards/enabled.guard';

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
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastrService: ToastrService,
    private guard: EnabledGuard
  ) {}

  ngOnInit() {
    this.route.params.subscribe({
      next: (params: Params) => {
        this.productId = params['id'];
        // en caso de que exista el id comprobamos que este habilitado
        if (this.productId) {
          this.productService.get(this.productId).subscribe(product =>{
            this.product = product 
            // en caso de que este habilitado el guard permitira el paso
            this.guard.checkProduct(this.product) 
          })
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
          this.toastrService.error(
            'El producto seleccionado se ha quedado sin stock'
          );
        } else {
          this.toastrService.success(
            'Producto añadido al carrito correctamente'
          );
        }
      },
    });
  }
}
