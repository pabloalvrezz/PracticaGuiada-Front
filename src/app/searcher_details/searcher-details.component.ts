import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { ProductService } from '../_services/product.service';
import { Product } from '../_models/product';

@Component({
  selector: 'searcher-details',
  templateUrl: 'searcher-details.component.html',
})
export class SearcherDetailsComponent implements OnInit {
  product: Product = new Product();

  productId!: number;

  description: string | null = '';

  stock?: number;

  price?: number;

  /**
   * Variables usadas para controlar el toast del carrito de la compra
   */
  

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.productId = 0;
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
  
  public showSuccess(): void {
    this.toastrService.success('Producto añadido corretamente a su carrito');
  }

}
