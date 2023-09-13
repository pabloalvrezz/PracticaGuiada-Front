import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, Type } from '../_models/product';
import { ProductService } from '../_services/product.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Prices } from '../_models/price';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styles: [],
})
export class ProductsDetailsComponent implements OnInit {
  /**
   * Datos del producto actual
   */
  product: Product = new Product();

  /**
   * Si el modo esta en verdadero se tratara de creacion de productos
   */
  createMode: boolean = true;

  /**
   *Id del producto actual
   */
  productId!: number;

  /**
   * Decripcion actual del producto
   */
  description: string | null = '';

  /**
   *Stock actual del producto
   */
  stock?: number;

  /**
   *Estado actual del producto
   */
  enabled: boolean | null = true;

  /**
   * Tipos posibles de cada producto
   */
  type: Array<string> = ['JUGUETE', 'FRUTAS', 'VERDURAS', 'DECORACION', 'ROPA'];

  /**
   *Productos que no tiene asignado ningun precio
   */
  productosDisponibles: Product[] = [];

  /**
   * Datos del precio actual del producto
   */
  prices: Prices = new Prices();

  constructor(
    private router: Router,
    private translate: TranslateService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productId = 0;
    this.description = '';
    this.stock = 0;
    this.enabled = true;
    this.prices.cuantity = 0;

    this.route.params.subscribe({
      next: (params: Params) => {
        console.log('PAramss');
        console.log(params);
        this.productId = params['id'];
        if (this.productId) {
          this.createMode = false;

          this.productService
            .get(this.productId)
            .subscribe((product: Product) => {
              this.product = product;
              console.log(this.product.description);
            });
        } else {
          this.createMode = true;
          this.product.enabled = true;
        }
      },
    });
  }

  /**
   *Metodo para guardar el producto que se esta creando
   */
  save(): void {
    let observable: Observable<Product>;

    if (this.createMode) observable = this.productService.save(this.product);
    else observable = this.productService.update(this.product);

    observable.subscribe({
      next: (product: Product) => {
        if (this.createMode) {
          this.router.navigate(['/main/product']);
        } else {
          this.router.navigate(['/main/product']);
          this.product = product;
        }

        this.toastr.success(
          this.translate.instant(
            'toast.success-saving',
            this.translate.instant('toast.success')
          )
        );
      },
      error: (error) => {
        setTimeout(function () {
          window.location.reload();
        }, 600);
        this.toastr.error(
          this.translate.instant(
            'toast.error-saving',
            this.translate.instant('toast.error')
          )
        );
      },
    });
  }

}
